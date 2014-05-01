/*global Firebase*/
(function(window, angular) {
  'use strict';

  var app = angular.module('firedraftApp');

  app.service('PlayerService', function($q, PLAYER_URL, NAMEINDEX_URL, Player) {

    var playerService = {};

    playerService.currentListener = false;

    playerService.offLoad = function(ref) {
      if (playerService.currentListener) {
        playerService.currentListener.off();
        playerService.currentListener = ref;
      }
    };

    playerService.create = function(params) {
      return Player.create(params);
    };

    playerService.load = function(limit, callback) {
      var playerRef;
      playerService.offLoad(playerRef);

      if (limit) {
        playerRef = new Firebase(PLAYER_URL).startAt().limit(limit);
      } else {
        playerRef = new Firebase(PLAYER_URL);
      }
      playerService.currentListener = playerRef;

      playerRef.on('value', function(snapshot) {
        var players = [];

        snapshot.forEach(function(player) {
          var params = {};
          params = player.val();
          params.id = player.name();
          players.push(Player.create(params));
          // PickService.getByPlayerId(params.id).then(function(pick) {
          //   params.pick = pick;
          //   players.push(Player.create(params));
          // });
        });

        callback.call(this, players);
      });

    };

    playerService.startAt = function(last, limit, callback) {
      var playerRef = new Firebase(PLAYER_URL).startAt(null, last).limit(limit);
      playerService.offLoad(playerRef);

      playerRef.on('value', function(snapshot) {
        var players = [];
        snapshot.forEach(function(player) {
          var params = {};
          params = player.val();
          params.id = player.name();
          players.push(Player.create(params));
        });

        callback.call(this, players);
      });

    };

    playerService.endAt = function(last, limit, callback) {
      var playerRef = new Firebase(PLAYER_URL).endAt(null, last).limit(limit);
      playerService.offLoad(playerRef);

      playerRef.on('value', function(snapshot) {
        var players = [];
        snapshot.forEach(function(player) {
          var params = {};
          params = player.val();
          params.id = player.name();
          players.push(Player.create(params));
        });

        callback.call(this, players);
      });

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

    playerService.findById = function(id, callback) {
      var playerRef = new Firebase(PLAYER_URL).child(id);
      playerService.offLoad(playerRef);

      playerRef.on('value', function(snapshot) {
        callback.call(this, createPlayerFromSnapshot(snapshot));
      });

    };

    playerService.listenToPlayer = function(player, callback) {
      var playerRef = new Firebase(PLAYER_URL).child(player.id);
      playerRef.on('value', function(snapshot) {
        var player = createPlayerFromSnapshot(snapshot);
        callback.call(this, player);
      });
    };

    playerService.updatePlayer = function(player) {
      var playerRef = new Firebase(PLAYER_URL).child(player.id);
      playerRef.update(player);
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
