const db = require("../models");
const Comment = db.comment;
const User = db.user;
const Op = db.Sequelize.Op;

// Create and Save a new Comment
exports.create = (req, res) => {
    // Validate request
    if (!req.body.comment_content) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Get comment content back
    const comment = {
      userId: req.body.userId,
      postId: req.body.postId,
      comment_content: req.body.comment_content
    };
  
    // Save Comment in the database
    Comment.create(comment)
      .then(data => {
        res.send(data);
      })
      .catch(error => res.status(500).json({ error }));
  };

// Delete a Comment with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Comment.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Comment was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Comment with id=${id}. Maybe Comment was not found!`
          });
        }
      })
      .catch(error => res.status(500).json({ error }));
  };

// Find all published Comment
exports.findAllPublished = (req, res) => {
  // J'indique que je veux récupérer les info que contient l'userId
  User.hasMany(Comment, {foreignKey: 'userId'}); 
  Comment.belongsTo(User, {foreignKey: 'userId'});
console.log(req.params.postId)
    Comment.findAll({
      where: { postId: req.params.postId },
      include: User
    })
      .then(data => {
        res.send(data);
      })
      .catch(error => res.status(500).json({ error }));
  };

  // Update a Comment by the id in the request
exports.report = (req, res) => {
  const id = req.params.id;
  let reportAction ; 
  if(req.params.action == 1){
    reportAction = true
  } else {
    reportAction = false
  }

  Comment.update(
    { isReported: reportAction },
    { where: { id: id } }
  )
    .then(num => {
      if (num == 1) {
        return res.status(201).json({ success: "Commentaire signalé !" });
      } else {
        return res.status(404).json({ error: "Impossible de signaler ce commentaire" });
      }
    })
    .catch(error => res.status(500).json({ error }));
};

// Find all reported post
exports.findAllReported = (req, res) => {
  // User.hasMany(Comment, {foreignKey: 'userId'}); 
  // Comment.belongsTo(User, {foreignKey: 'userId'});

  // Comment.findAll(
  //   // { where: { isReported: true } }
  //   )

  //   .then(data => {
  //     res.send(data);
  //   })
  //   .catch(error => res.status(500).json({ error }));
};

