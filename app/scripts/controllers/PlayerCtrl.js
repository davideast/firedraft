(function(window, angular) {

  'use strict';

  angular.module('firedraftApp')
    .controller('PlayerCtrl', function ($scope, PlayerService) {
      var PAGE_SIZE = 5;
      $scope.players = [];
      $scope.indexes = [];

      PlayerService.startAt(PAGE_SIZE).then(function(players) {
        $scope.players = players;
      });

      PlayerService.endAt('-JLjbRwHpTNXRcrD3FHS', PAGE_SIZE).then(function(players) {
        console.log(players);
      });

      PlayerService.indexes().then(function(indexes) {
        $scope.indexes = indexes;
        $scope.searched = indexes[0].value;
      });

      $scope.$watch('searched', function(search) {
        console.log(search);
        if (search && search !== 'All') {
          PlayerService.findById(search).then(function(player) {
            $scope.players = [player];
          });
        }
      });

    });


}(window, angular));
