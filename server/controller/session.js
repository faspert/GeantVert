/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';

var mongoose = require('mongoose');
var passport = require('passport');


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
    if (req.isAuthenticated()) {
        return res.json(req.user.user_info);
    }
    res.send(401);
}

/**
 * Logout
 * returns nothing
 */
exports.logout = function (req, res) {
    if (req.user) {
        req.logout();
        res.send(200);
    } else {
        res.send(400, "Not logged in");
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
            return res.json(400, error);
        }
        req.logIn(user, function (err) {
            if (err) {
                return res.send(err);
            }
            res.json(req.user.user_info);
        });
    })(req, res, next);
}

