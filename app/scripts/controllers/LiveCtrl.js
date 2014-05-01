(function(window, angular) {
  'use strict';

  angular.module('firedraftApp')
    .controller('LiveCtrl', ['$scope', 'PickService', function($scope, PickService) {

      function init() {
        $scope.picks = [];

        PickService.load(function(promise) {
          promise.then(function(picks) {
            $scope.picks = picks;
          });
        });
      }

      init();

    }]);

}(window, angular));
