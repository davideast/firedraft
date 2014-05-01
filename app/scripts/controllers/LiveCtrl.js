(function(window, angular) {
  'use strict';

  angular.module('firedraftApp')
    .controller('LiveCtrl', ['$scope', function($scope) {

      function init() {
        $scope.picks = [];
      }

      init();

    }]);

}(window, angular));
