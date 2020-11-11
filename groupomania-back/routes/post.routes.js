module.exports = app => {
    
    const post = require("../controllers/post.controller");
    const { authJwt } = require("../middleware");
    const router = require("express").Router();
  
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });

    // Create a new post
    router.post("/", [authJwt.verifyToken], post.create);
  
    // Retrieve all published posts
    router.get("/published", [authJwt.verifyToken], post.findAllPublished);
  
    // Retrieve all reported post
    router.get("/reported", [authJwt.verifyToken], post.findAllReported);
  
    // Report comment
    router.put("/report/:id/:action", [authJwt.verifyToken], post.report);
  
    // Delete a post with id
    router.delete("/:id", [authJwt.verifyToken], post.delete);
  
   
    app.use('/api/post', router);
};