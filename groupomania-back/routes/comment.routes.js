module.exports = app => {
    const auth = require('../middleware/auth');
    const comment = require("../controllers/comment.controller");
  
    var router = require("express").Router();
  
    // Create a new comment
    router.post("/", auth, comment.create);
  
    // Retrieve all published comments
    router.get("/:postId", auth, comment.findAllPublished);
  
    // Update a comment with id
    router.put("/:id", auth, comment.update);
  
    // Delete a comment with id
    router.delete("/:id", auth, comment.delete);
  
   
    app.use('/api/comment', router);
  };