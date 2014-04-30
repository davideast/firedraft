(function(window, angular) {

  'use strict';

  angular.module('firedraftApp')
    .controller('PlayerCtrl', function ($scope, PlayerService) {
      var PAGE_SIZE = 5;

      function init() {
        $scope.players = [];
        $scope.indexes = [];

        // PlayerService.load(PAGE_SIZE).then(function(players) {
        //   $scope.players = players;
        // });

        PlayerService.indexes().then(function(indexes) {
          $scope.indexes = indexes;
          $scope.searched = indexes[0].value;
        });

        $scope.$watch('searched', function(search) {
          if (search && search !== 'All') {
            PlayerService.findById(search).then(function(player) {
              $scope.players = [player];
            });
          } else if (search && search === 'All') {
            PlayerService.load(PAGE_SIZE).then(function(players) {
              $scope.players = players;
            });
          }
        });
      }

      function eventHandlers() {

        $scope.next = function() {
          // TODO: Fix this crappy offset
          PlayerService.startAt($scope.players[$scope.players.length - 1].id, PAGE_SIZE + 1).then(function(players) {
            if (players.length > 1) {
              players.shift();
              $scope.players = players;
              $scope.nextDisabled = false;
              $scope.prevDisabled = false;
            } else {
              $scope.nextDisabled = true;
            }
          });
        };

        $scope.previous = function() {
          PlayerService.endAt($scope.players[0].id, PAGE_SIZE + 1).then(function(players) {
            if (players.length > 1) {
              players.pop();
              $scope.players = players;
              $scope.nextDisabled = false;
              $scope.prevDisabled = false;
            } else {
              $scope.prevDisabled = true;
            }
          });
        };

      }

      init();
      eventHandlers();

    });


}(window, angular));
