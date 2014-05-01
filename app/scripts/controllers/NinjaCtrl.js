/*global Firebase*/
/*global FirebaseSimpleLogin*/
(function(window, angular) {
  'use strict';

  angular.module('firedraftApp')
    .controller('NinjaCtrl', ['$scope', 'PickService', 'FBURL', '$window', function($scope, PickService, FBURL, $window) {

      var draftRef = new Firebase(FBURL);
      new FirebaseSimpleLogin(draftRef, function(error, user) {
        if (!user) {
          $window.location.href = '#/live';
        }
      });

      $scope.simulate = function() {
        PickService.simulate();
      };

    }]);

}(window, angular));
