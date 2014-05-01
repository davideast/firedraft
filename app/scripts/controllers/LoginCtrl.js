/*global Firebase*/
/*global FirebaseSimpleLogin*/
(function(window, angular) {
  'use strict';

  angular.module('firedraftApp')
    .controller('LoginCtrl', ['$scope', 'PickService', 'FBURL', '$window', function($scope, PickService, FBURL, $window) {

      var draftRef = new Firebase(FBURL);
      var auth = new FirebaseSimpleLogin(draftRef, function(error, user) {
        if (user) {
          $window.location.href = '#/ninja';
        }
      });

      $scope.user = {};

      $scope.login = function() {
        auth.login('password', {
          email: $scope.user.email,
          password: $scope.user.password,
          rememberMe: true
        });
      };

    }]);

}(window, angular));
