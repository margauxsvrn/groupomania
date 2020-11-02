// module.exports = app => {
//     const user = require("../controllers/user.controller");
  
//     var router = require("express").Router();
  
//     // Create a new user
//     router.post("/user", user.create);
  
//     // Retrieve a single user with id
//     router.get("/user/:id", user.findOne);
  
//     // Update a user with id
//     router.put("/user/:id", user.update);
  
//     // Delete a user with id
//     router.delete("/user/:id", user.delete);
  
   
//     app.use('/api/user', router);
//   };