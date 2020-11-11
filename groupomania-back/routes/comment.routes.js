module.exports = app => {

    const comment = require("../controllers/comment.controller");
    const { authJwt } = require("../middleware");
    const router = require("express").Router();
  
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });

    // Create a new comment
    router.post("/", [authJwt.verifyToken], comment.create);
  
    // Retrieve all published comments
    router.get("/published/:postId", [authJwt.verifyToken], comment.findAllPublished);
  
    // Retrieve all reported comment
    router.get("/reported", [authJwt.verifyToken], comment.findAllReported);
  
    // Delete a comment with id
    router.delete("/:id", [authJwt.verifyToken], comment.delete);

    // Report comment
    router.put("/report/:id/:action", [authJwt.verifyToken], comment.report);
  
   
    app.use('/api/comment', router);
  };