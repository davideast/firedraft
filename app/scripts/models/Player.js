(function(window, angular) {
  'use strict';

  var app = angular.module('firedraftApp');

  app.factory('Player', ['Pick', function(Pick) {

      var Player = (function() {
        function Player(params) {
          this.id = params.id;
          this.first = params.first;
          this.last = params.last;
          this.ht = params.ht;
          this.wt = params.wt;
          this.pos = params.pos;
          this.college = params.college;
          this.grade = params.grade;
          this.picture = params.picture;
          this.predraft = params.predraft || 0;
          this.postdraft = params.postdraft || 0;
          this.pick = this.setPick(params.pick);
        }
        Player.prototype = {
          setPick: function(params) {
            if (params) {
              return Pick.create(params);
            } else {
              return false;
            }
          }
        };
        return Player;
      }());

      Player.create = function(params) {
        return new Player(params);
      };

      return Player;
    }]);

}(window, angular));
