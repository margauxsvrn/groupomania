module.exports = app => {
    const user = require("../controllers/user.controller");
  
    var router = require("express").Router();
  
    // Create a new user
    router.post("/register", user.register);

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