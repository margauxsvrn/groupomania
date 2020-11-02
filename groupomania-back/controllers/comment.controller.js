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
      user_id: req.params.user_id,
      post_id: req.params.post_id,
      comment_content: req.body.comment_content
    };
  
    // Save Comment in the database
    Comment.create(comment)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Comment."
        });
      });
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
      .catch(err => {
        res.status(500).send({
          message: "Error updating Comment with id=" + id
        });
      });
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
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Comment with id=" + id
        });
      });
  };

// Find all published Comment
exports.findAllPublished = (req, res) => {
    Comment.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Comment."
        });
      });
  };