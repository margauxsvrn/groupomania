const db = require("../models");
const Comment = db.comment;
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
      userId: req.params.userId,
      postId: req.params.postId,
      comment_content: req.body.comment_content
    };
  
    // Save Comment in the database
    Comment.create(comment)
      .then(data => {
        res.send(data);
      })
      .catch(error => res.status(500).json({ error }));
  };


// Update a Comment by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    Comment.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Comment was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Comment with id=${id}. Maybe Comment was not found or req.body is empty!`
          });
        }
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
    Comment.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(error => res.status(500).json({ error }));
  };