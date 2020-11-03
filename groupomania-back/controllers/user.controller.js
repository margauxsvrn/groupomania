// Imports
var bcrypt = require('bcrypt');
var jwtAuth = require('../middleware/auth');
var models = require('../models');
const User = models.user;
var asyncLib = require('async');
const Op = models.Sequelize.Op;

// Constants
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*\d).{4,8}$/;

// Routes
exports.register = (req, res) => {

    // Params
    var email = req.body.email;
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var password = req.body.password;

    if (email == null || firstname == null || lastname == null || password == null) {
        return res.status(400).json({ 'error': 'missing parameters' });
    }

    if (!EMAIL_REGEX.test(email)) {
        return res.status(400).json({ 'error': 'email is not valid' });
    }

    if (!PASSWORD_REGEX.test(password)) {
        return res.status(400).json({ 'error': 'password invalid (must length 4 - 8 and include 1 number at least)' });
    }

    asyncLib.waterfall([
        function (done) {
            User.findOne({
                attributes: ['email'],
                where: { email: email }
            })
                .then(function (userFound) {
                    done(null, userFound);
                })
                .catch(function (err) {
                    return res.status(500).json({ 'error': 'unable to verify user' });
                });
        },
        function (userFound, done) {
            if (!userFound) {
                bcrypt.hash(password, 5, function (err, bcryptedPassword) {
                    done(null, userFound, bcryptedPassword);
                });
            } else {
                return res.status(409).json({ 'error': 'user already exist' });
            }
        },
        
        function (userFound, bcryptedPassword, done) {
            var newUser = User.create({
                email: email,
                firstname: firstname,
                lastname: lastname,
                password: bcryptedPassword,
                isAdmin: 0
            })
                .then(function (newUser) {
                    done(newUser);
                })
                .catch(function (err) {
                    return res.status(500).json({ 'error': 'cannot add user' });
                });
        }
    ], function (newUser) {
        if (newUser) {
            return res.status(201).json({
                'userId': newUser.id
            });
        } else {
            return res.status(500).json({ 'error': 'cannot add user' });
        }
    });
},

exports.login = (req, res) => {

    // Params
    var email = req.body.email;
    var password = req.body.password;

    if (email == null || password == null) {
        return res.status(400).json({ 'error': 'missing parameters' });
    }

    asyncLib.waterfall([
        function (done) {
            User.findOne({
                where: { email: email }
            })
                .then(function (userFound) {
                    done(null, userFound);
                })
                .catch(function (err) {
                    return res.status(500).json({ 'error': 'unable to verify user' });
                });
        },
        function (userFound, done) {
            if (userFound) {
                bcrypt.compare(password, userFound.password, function (errBycrypt, resBycrypt) {
                    done(null, userFound, resBycrypt);
                });
            } else {
                return res.status(404).json({ 'error': 'user not exist in DB' });
            }
        },
        function (userFound, resBycrypt, done) {
            if (resBycrypt) {
                done(userFound);
            } else {
                return res.status(403).json({ 'error': 'invalid password' });
            }
        }
    ], 
        function (userFound) {
        if (userFound) {
            return res.status(201).json({
                'userId': userFound.id,
                'token': jwtAuth.generateTokenForUser(userFound)
            });
        } else {
            return res.status(500).json({ 'error': 'cannot log on user' });
        }
    });
},

exports.findOne = (req, res) => {

    // Getting auth header
    var headerAuth = req.headers['authorization'];
    var userId = jwtAuth.getUserId(headerAuth);

    if (userId < 0)
        return res.status(400).json({ 'error': 'wrong token' });

    User.findOne({
        attributes: ['id', 'email', 'firstname', 'lastname'],
        where: { id: userId }
    }).then(function (user) {
        if (user) {
            res.status(201).json(user);
        } else {
            res.status(404).json({ 'error': 'user not found' });
        }
    }).catch(function (err) {
        res.status(500).json({ 'error': 'cannot fetch user' });
    });
},

exports.update = (req, res) => {

    // Getting auth header
    var headerAuth = req.headers['authorization'];
    var userId = jwtAuth.getUserId(headerAuth);

    // Params
    var lastname = req.body.lastname;
    var firstname = req.body.firstname;

    asyncLib.waterfall([
        function (done) {
            User.findOne({
                attributes: ['id', 'lastname', 'firstname'],
                where: { id: userId }
            }).then(function (userFound) {
                done(null, userFound);
            })
                .catch(function (err) {
                    return res.status(500).json({ 'error': 'unable to verify user' });
                });
        },
        function (userFound, done) {
            if (userFound) {
                userFound.update({
                    email: (email ? email : userFound.email)
                }).then(function () {
                    done(userFound);
                }).catch(function (err) {
                    res.status(500).json({ 'error': 'cannot update user' });
                });
            } else {
                res.status(404).json({ 'error': 'user not found' });
            }
        },
    ], 
        function (userFound) {
            if (userFound) {
                return res.status(201).json(userFound);
            } else {
                return res.status(500).json({ 'error': 'cannot update user profile' });
            }
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    
    User.destroy({
        where: { id: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "Post was deleted successfully!"
            });
        } else {
            res.send({
            message: `Cannot delete User with id=${id}. Maybe User was not found!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Could not delete User with id=" + id
        });
        });
};
