/*global Firebase*/
(function(window, angular) {
  'use strict';

  var app = angular.module('firedraftApp');

  app.service('PlayerService', function($q, PLAYER_URL, NAMEINDEX_URL, Player) {

    var playerService = {};

    playerService.create = function(params) {
      return Player.create(params);
    };

    playerService.load = function(limit) {
      var playerRef,
          deferred = $q.defer();

      if (limit) {
        playerRef = new Firebase(PLAYER_URL).startAt().limit(limit);
      } else {
        playerRef = new Firebase(PLAYER_URL);
      }

      playerRef.once('value', function(snapshot) {
        var players = [];

        snapshot.forEach(function(player) {
          var params = {};
          params = player.val();
          params.id = player.name();
          players.push(Player.create(params));
        });

        deferred.resolve(players);
      });

      return deferred.promise;
    };

    playerService.startAt = function(last, limit) {
      var playerRef = new Firebase(PLAYER_URL).startAt(null, last).limit(limit),
          deferred = $q.defer();

      playerRef.once('value', function(snapshot) {
        var players = [];
        snapshot.forEach(function(player) {
          var params = {};
          params = player.val();
          params.id = player.name();
          players.push(Player.create(params));
        });

        deferred.resolve(players);
      });

      return deferred.promise;
    };

    playerService.endAt = function(last, limit) {
      var playerRef = new Firebase(PLAYER_URL).endAt(null, last).limit(limit),
          deferred = $q.defer();

      playerRef.once('value', function(snapshot) {
        var players = [];
        snapshot.forEach(function(player) {
          var params = {};
          params = player.val();
          params.id = player.name();
          players.push(Player.create(params));
        });

        deferred.resolve(players);
      });

      return deferred.promise;
    };

    playerService.indexes = function() {
      var indexRef = new Firebase(NAMEINDEX_URL),
        deferred = $q.defer();

      indexRef.once('value', function(snapshot) {
        var indexes = [];
        snapshot.forEach(function(index) {
          indexes.push({
            name: index.name(),
            value: index.val()
          });
        });

        indexes.unshift({
          name: 'All Players',
          value: 'All'
        });

        deferred.resolve(indexes);
      });

      return deferred.promise;
    };

    playerService.findById = function(id) {
      var playerRef = new Firebase(PLAYER_URL).child(id),
          deferred = $q.defer();

      playerRef.once('value', function(snapshot) {
        deferred.resolve(createPlayerFromSnapshot(snapshot));
      });

      return deferred.promise;
    };

    function createPlayerFromSnapshot(snapshot) {
      var player = snapshot.val(),
          params = {};

      params = player;
      params.id = snapshot.name();
      return Player.create(params);
    }

    return playerService;

  });

}(window, angular));
