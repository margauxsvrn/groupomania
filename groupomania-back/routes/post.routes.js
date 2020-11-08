module.exports = app => {
    const auth = require('../middleware/auth');
    const post = require("../controllers/post.controller");
  
    var router = require("express").Router();
  
    // Create a new post
    router.post("/",  post.create);
  
    // Retrieve all published posts
    router.get("/published", post.findAllPublished);
  
    // Retrieve a single post with id
    router.get("/:id", auth, post.findOne);
  
    // Update a post with id
    router.put("/:id", auth, post.update);
  
    // Delete a post with id
    router.delete("/:id", auth, post.delete);
  
   
    app.use('/api/post', router);
  };