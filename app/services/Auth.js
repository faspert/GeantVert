'use strict';

angular.module('gardenApp')
  .factory('Auth', function Auth($location, Session, Registration, $cookies) {
    return {

      signup: function(user, callback) {
        var cb = callback || angular.noop;
        Registration.save( {
              username: user.username,
              email: user.email,
              password: user.password
            }, function(user,responseHeaders) {
          $cookies.put('username',user.username);
          console.log("Success Response!!!");
          return cb(null,responseHeaders);
        }, function(err) {
          console.log("Error Response!!!");
          return cb(err.data,null);
        });
      },

      login: function(provider, user, callback) {
        var cb = callback || angular.noop;
        Session.save({
            provider: provider,
          email: user.email,
          password: user.password,
        }, function(user,responseHeaders) {
          $cookies.put('username',user.email);
            return cb(null,responseHeaders);
        }, function(err) {
            console.log("Error Response!!!");
          return cb(err.data,null);
        });
      },

      logout: function(callback) {
        var cb = callback || angular.noop;
        console.log('Session logout')
        Session.delete(function(res) {
                $cookies.remove('username');
                return cb();
          },
          function(err) {
              return cb(err.data);
          });
      },

      

      currentUser: function() {
        Session.get(function(user) {
          $rootScope.currentUser = user;
        });
      }
    };
  })