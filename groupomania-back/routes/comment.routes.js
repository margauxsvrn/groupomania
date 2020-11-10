module.exports = app => {
    const auth = require('../middleware/auth');
    const comment = require("../controllers/comment.controller");
  
    var router = require("express").Router();
  
    // Create a new comment
    router.post("/", comment.create);
  
    // Retrieve all published comments
    router.get("/:postId", comment.findAllPublished);
  
    // Retrieve all reported comment
    router.get("/reported", comment.findAllReported);
  
    // Delete a comment with id
    router.delete("/:id", comment.delete);

    // Report comment
    router.put("/report/:id/:action", comment.report);
  
   
    app.use('/api/comment', router);
  };