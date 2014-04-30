(function(window, angular) {
  'use strict';

  var app = angular.module('firedraftApp');

  app.factory('Player', function() {

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
        }
        return Player;
      }());

      Player.create = function(params) {
        return new Player(params);
      };

      return Player;
    });

}(window, angular));
