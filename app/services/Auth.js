'use strict';

angular.module('gardenApp')
  .factory('Auth', function Auth($location, $rootScope, Session, $cookieStore) {
    $rootScope.currentUser = $cookieStore.put('currentuser','user') || null;
    $cookieStore.remove('currentuser');

    return {

      login: function(provider, user, callback) {
        var cb = callback || angular.noop;
        Session.save({
          provider: provider,
          email: user.email,
          password: user.password,
          rememberMe: user.rememberMe
        }, function(user,responseHeaders) {
          $rootScope.currentUser = user;
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
            $rootScope.currentUser = null;
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