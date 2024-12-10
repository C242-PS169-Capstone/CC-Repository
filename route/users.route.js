const express = require('express');
const router = express.Router();
const controller = require('../controller/users.controller');

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // Define routes
    app.get('/users', controller.getAllUsers);
    app.get('/users/:id', controller.getUserById);
    app.post('/users', controller.createUser);
    app.put('/users/:id', controller.updateUser);
    app.delete('/users/:id', controller.deleteUserById);
    app.delete('/users', controller.deleteAllUsers);
};
