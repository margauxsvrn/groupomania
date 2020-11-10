module.exports = app => {
    const auth = require('../middleware/auth');
    const post = require("../controllers/post.controller");
  
    var router = require("express").Router();
  
    // Create a new post
    router.post("/",  post.create);
  
    // Retrieve all published posts
    router.get("/published", post.findAllPublished);
  
    // Retrieve all reported post
    router.get("/reported", post.findAllReported);
  
    // Report comment
    router.put("/report/:id/:action", post.report);
  
    // Delete a post with id
    router.delete("/:id", post.delete);
  
   
    app.use('/api/post', router);
  };