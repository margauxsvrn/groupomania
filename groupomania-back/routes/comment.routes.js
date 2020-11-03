module.exports = app => {
    const comment = require("../controllers/comment.controller");
  
    var router = require("express").Router();
  
    // Create a new comment
    router.post("/", comment.create);
  
    // Retrieve all published comments
    router.get("/:postId", comment.findAllPublished);
  
    // Update a comment with id
    router.put("/:id", comment.update);
  
    // Delete a comment with id
    router.delete("/:id", comment.delete);
  
   
    app.use('/api/comment', router);
  };