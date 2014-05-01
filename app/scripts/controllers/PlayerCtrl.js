(function(window, angular) {

  'use strict';

  angular.module('firedraftApp')
    .controller('PlayerCtrl', ['$scope', 'PlayerService', 'PickService', '$timeout', function ($scope, PlayerService, PickService, $timeout) {
      var PAGE_SIZE = 5;

      function init() {
        $scope.players = [];
        $scope.indexes = [];

        PlayerService.load(PAGE_SIZE, function(players) {
          $timeout(function() {
            $scope.players = players;
          });
        });

        // load the indexes to search for the players
        PlayerService.indexes().then(function(indexes) {
          $scope.indexes = indexes;
          $scope.searched = 'start';
        });

        // watch the value of searched, when it's changed
        // search for the player by their id
        $scope.$watch('searched', function(search) {
          if ($scope.searched === 'start') {
            return;
          }
          if (search && search !== 'All') {
            PlayerService.findById(search, function(player) {
              $timeout(function() {
                console.log(player);
                $scope.players = [player];
              });
            });
          } else if (search && search === 'All') {
            PlayerService.load(PAGE_SIZE, function(players) {
              $timeout(function() {
                $scope.players = players;
              });
            });
          }
        });

        PickService.loadPickData();
      }

      function eventHandlers() {

        // Page to the previous set of players.
        // This implementation is kind of wonky.
        // It grabs the last player in the array and
        // performs a startAt query for the page size plus one
        // and shifts the first returned player. This will
        // create the right page, but it had to load an extra player.
        $scope.next = function() {
          // TODO: Fix this crappy offset
          PlayerService.startAt($scope.players[$scope.players.length - 1].id, PAGE_SIZE + 1, function(players) {
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

        // Page to the previous set of players.
        // This implementation is kind of wonky.
        // It grabs the first player in the array and
        // performs an endAt query for the page size plus one
        // and pops the last returned player. This will
        // create the right page, but it had to load an extra player.
        $scope.previous = function() {
          // TODO: Fix this crappy offset
          PlayerService.endAt($scope.players[0].id, PAGE_SIZE + 1, function(players) {
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

      // kick off handlers
      init();
      eventHandlers();




    }]);


}(window, angular));
