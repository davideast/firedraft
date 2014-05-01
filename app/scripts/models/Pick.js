(function(window, angular) {
  'use strict';

  var app = angular.module('firedraftApp');

  app.factory('Pick', function() {

      var Pick = (function() {
        function Pick(params) {
          this.id = params.id;
          this.playerId = params.playerId;
          this.teamId = params.teamId;
          this.teamName = params.teamName || null;
        }
        return Pick;
      }());

      Pick.create = function(params) {
        return new Pick(params);
      };

      return Pick;
    });

}(window, angular));
