const db = require("../models");
const Post = db.post;
const User = db.user;
const Op = db.Sequelize.Op;

// Create and Save a new Post
exports.create = (req, res) => {
    // Validate request
    if (!req.body.text_content) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a Post
    const post = {
      userId: req.body.userId,
      text_content: req.body.text_content
    };
  
    // Save Post in the database
    Post.create(post)
      .then(data => {
        res.send(data);
      })
      .catch(error => res.status(500).json({ error }));
  };


// Find all reported post
exports.findAllReported = (req, res) => {
  User.hasMany(Post, {foreignKey: 'userId'}); 
  Post.belongsTo(User, {foreignKey: 'userId'});
  
  Post.findAll(
    { where: { isReported: true } }
    )
    .then(data => {
      res.send(data);
    })
    .catch(error => res.status(500).json({ error }));
};

// Update a Post by the id in the request
exports.report = (req, res) => {
  const id = req.params.id;
  let reportAction ; 
  if(req.params.action == 1){
    reportAction = true
  } else {
    reportAction = false
  }

  Post.update(
    { isReported: reportAction },
    { where: { id: id } }
  )
    .then(num => {
      if (num == 1) {
        return res.status(201).json({ success: "Post signalé !" })
      } else {
        return res.status(404).json({ error: "Impossible de signaler ce post" })
      }
    })
    .catch(error => res.status(500).json({ error }));

};

// Delete a Post with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Post.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Post was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Post with id=${id}. Maybe Post was not found!`
          });
        }
      })
      .catch(error => res.status(500).json({ error }));
  };

// Find all published Posts
exports.findAllPublished = (req, res) => {
  // J'indique que je veux récupérer les info que contient l'userId
  User.hasMany(Post, {foreignKey: 'userId'}); 
  Post.belongsTo(User, {foreignKey: 'userId'});

    Post.findAll({include: User})
      .then(data => {
        res.send(data);
      })
      .catch(error => res.status(500).json({ error }));
  };