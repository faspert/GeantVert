'use strict';

angular.module('gardenApp')
  .factory('Auth', function Auth($location, Session, Registration, $cookieStore) {
    $cookieStore.put('currentuser','user') || null;
    $cookieStore.remove('username');

    return {

      signup: function(user, callback) {
        var cb = callback || angular.noop;
        Registration.save( {
              username: user.username,
              email: user.email,
              password: user.password
            }, function(user,responseHeaders) {
          $cookieStore.put('username',user.username);
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
          $cookieStore.put('username',user.email);
          console.log("Success Response!!!");
          return cb(null,responseHeaders);
        }, function(err) {
            console.log("Error Response!!!");
          return cb(err.data,null);
        });
      },

      logout: function(callback) {
        var cb = callback || angular.noop;
        Session.delete(function(res) {
            CurrentUser.setUser('');
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