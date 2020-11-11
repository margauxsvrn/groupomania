module.exports = app => {
  const user = require("../controllers/user.controller");
  var router = require("express").Router();

  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

    // Create a new user
    router.post("/signup", user.signup);

    // Create a new user
    router.post("/login", user.login);
  
    // Retrieve a single user with id
    router.get("/:id", user.findOne);
  
    // Update a user with id
    router.put("/:id", user.update);
  
    // Delete a user with id
    router.delete("/:id", user.delete);
  
   
    app.use('/api/user', router);
  };

