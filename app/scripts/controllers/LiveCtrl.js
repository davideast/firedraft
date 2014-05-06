(function(window, angular) {
  'use strict';

  angular.module('firedraftApp')
    .controller('LiveCtrl', ['$scope', 'PickService', '$cookieStore', function($scope, PickService, $cookieStore) {
      var USER_VOTES = 'userVotes';

      function setVote(id) {
        var userVotes = $cookieStore.get(USER_VOTES);
        userVotes[id] = true;
        $cookieStore.put(USER_VOTES, userVotes);
      }

      function hasVoted(id) {
        return !!$cookieStore.get(USER_VOTES)[id];
      }

      function init() {
        $scope.picks = [];

        PickService.load(function(promise) {
          promise.then(function(picks) {
            console.log(picks);
            $scope.picks = picks.reverse();
          });
        });
      }

      function eventHandlers() {
        $scope.upVote = function(pick) {
          if (!hasVoted(pick.id)) {
            PickService.upVote(pick);
            setVote(pick.id);
          }
        };

        $scope.downVote = function(pick) {
          if (!hasVoted(pick.id)) {
            PickService.downVote(pick);
            setVote(pick.id);
          }
        };
      }

      init();
      eventHandlers();

    }]);

}(window, angular));
