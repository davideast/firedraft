/*global Firebase*/
/*global FirebaseSimpleLogin*/
(function(window, angular) {
  'use strict';

  angular.module('firedraftApp')
    .controller('LogoutCtrl', ['$scope', 'PickService', 'FBURL', '$window', function($scope, PickService, FBURL, $window) {

      var draftRef = new Firebase(FBURL);
      var auth = new FirebaseSimpleLogin(draftRef, function(error, user) {
        if (user) {
          auth.logout();
        }
        $window.location.href = '#/live';
      });

    }]);

}(window, angular));
