const db = require("../models");
const Post = db.post;
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
      user_id: req.params.userId,
      text_content: req.body.text_content
    };
  
    // Save Post in the database
    Post.create(post)
      .then(data => {
        res.send(data);
      })
      .catch(error => res.status(500).json({ error }));
  };


// Find a single Post with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Post.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(error => res.status(500).json({ error }));
  };

// Update a Post by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    Post.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Post was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Post with id=${id}. Maybe Post was not found or req.body is empty!`
          });
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
    Post.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(error => res.status(500).json({ error }));
  };