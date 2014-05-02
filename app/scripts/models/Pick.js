(function(window, angular) {
  'use strict';

  var app = angular.module('firedraftApp');

  app.factory('Pick', function(Player) {

      var Pick = (function() {
        function Pick(params) {
          this.id = params.id;
          this.playerId = params.playerId;
          this.teamId = params.teamId;
          this.teamName = params.teamName || null;
          this.score = params.score || null;
          this.upVotes = params.upVotes || [];
          this.downVotes = params.downVotes || [];
          this.upVoteCount = this.setCount(params.upVotes);
          this.downVoteCount = this.setCount(params.downVotes);
          this.score = this.upVoteCount - this.downVoteCount;
          this.player = this.setPlayer(params.player);
        }
        Pick.prototype = {
          setPlayer: function(params) {
            if (params) {
              return Player.create(params);
            } else {
              return false;
            }
          },
          setCount: function(votes) {
            if (votes) {
              return Object.keys(votes).length;
            } else {
              return 0;
            }
          }
        };
        return Pick;
      }());

      Pick.create = function(params) {
        return new Pick(params);
      };

      return Pick;
    });

}(window, angular));
