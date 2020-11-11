const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Create and Save a new User
exports.signup = (req, res) => {
    bcrypt.hash(req.body.password, 10, (err, pass) => {
        let newUser = User.create({
                email: req.body.email,
                password: pass,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                isAdmin: false
            })
            .then(newUser => {
                return res.status(201).json({
                    message: 'User created !',
                    userId: newUser.id
                })
            })
            .catch(err => {
                return res.status(500).json({
                    'error': `${err}`
                })
            })
    })
      
};

exports.login = (req, res, next) => {
    User.findOne({ 
        where: { 
            email: req.body.email }
        })
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: "Cet utilisateur n'existe pas" });
            }
            var passwordIsValid = bcrypt.compareSync(
              req.body.password,
              user.password
            );
      
            if (!passwordIsValid) {
              return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
              });
            }
      
            var token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
              expiresIn: 86400 // 24 hours
            });
            res.status(200).send({
              userId: user.id,
              firstname: user.firstname,
              lastname: user.lastname,
              email: user.email,
              isAdmin: user.isAdmin,
              accessToken: token
            });
        })
        .catch(err => {
          res.status(500).send({ message: err.message });
        })
};

// Find a single User with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    User.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(error => res.status(500).json({ error }));
  };

// Update a User by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
  console.log("################" , firstname, lastname);
    User.update( 
      { firstname, lastname },
      { where: { id: id } })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "User was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
          });
        }
      })
      .catch(error => res.status(500).json({ error }));
  };

// Delete a Comment with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    User.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "User was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete User with id=${id}. Maybe User was not found!`
          });
        }
      })
      .catch(error => res.status(500).json({ error }));
  };
