/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';

var mongoose = require('mongoose');
var passport = require('passport');



/**
 * Manually establish the session
 *
 * @param req
 * @param user User to be logged in (coming from mongo)
 */
exports.sessionLogin = function(req, res, user, next) {

    req.login(user, function (err) {
        if (err)
            return next(err);

        console.log('User : %s authenticated successfully',user.local.username);

        res.status(200).send();
    });
}




/**
 *  Middleware used to check if user has priviledge for accessing the requested URL
 *  If not authenticated correctly, returns a 401
 *
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
exports.ensureAuthenticated = function ensureAuthenticated(req, res, next) {
   console.log('Ensure user is authenticated');
    if (req.login()) {
        console.log('User is autenticated');
        next();
    }
    console.log('Failed to authenticate user');
    res.status(401).send();
}

/**
 * Logout
 * returns nothing
 */
exports.logout = function (req, res) {
    if (req.user) {
        req.logout();
        res.status(200).send();
    } else {
        res.status(400).send("Not logged in");
    }
};
/**
 * Login
 * requires: {email, password}
 */
exports.login = function (req, res, next) {
    passport.authenticate('local-login', function (err, user, info) {
        var error = err || info;
        if (error) {
            return res.status(400).json(error);
        }
        req.logIn(user, function (err) {
            if (err) {
                return res.send(err);
            }
            res.json(req.user.user_info);
        });
    })(req, res, next);
}

