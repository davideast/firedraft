/*global Firebase*/
(function(window, angular) {
  'use strict';

  var app = angular.module('firedraftApp');

  app.service('PickService', function($q, PICK_URL, PLAYER_URL, Pick, PICKINDEX_URL) {
    var pickService = {};

    // Loads the picks from the api and returns them as they are updated.
    // Picks are joined with Players and that result is returned as a
    // single promise. Once all of the results have been returned the
    // promises are combined and passed through the callback with $q.all()
    pickService.load = function(callback) {
      var pickRef = new Firebase(PICK_URL),
          playerRef = new Firebase(PLAYER_URL);

      pickRef.on('value', function(picksShot) {
        var picks = [];

        picksShot.forEach(function(pickshot) {
          var pick = pickshot.val(),
              subDeferred = $q.defer();

          playerRef.child(pick.playerId).once('value', function(playershot) {
            pick.player = playershot.val();
            subDeferred.resolve(Pick.create(pick));
          });

          picks.push(subDeferred.promise);

        });

        callback.call(this, $q.all(picks));
      });

    };

    pickService.upVote = function(pick) {
      var pickRef = new Firebase(PICK_URL).child(pick.id).child('upVotes');
      pickRef.push(true);
    };

    pickService.downVote = function(pick) {
      var pickRef = new Firebase(PICK_URL).child(pick.id).child('downVotes');
      pickRef.push(true);
    };

    // Updates the pick to the api.
    pickService.update = function(pick) {
      var pickRef = new Firebase(PICK_URL).child(pick.id),
          pickModel = Pick.create(pick);

      if (pickModel.player) {
        delete pickModel.player;
      }

      console.log(pickModel);
      pickRef.update(pickModel);
    };

    pickService.getByPlayerId = function(playerId) {
      var indexRef = new Firebase(PICKINDEX_URL),
          pickRef = new Firebase(PICK_URL),
          deferred = $q.defer();

      // from the playerId we can get the index of the pick id
      indexRef.child(playerId).once('value', function(snapshot) {
        var pickId = snapshot.val();

        if (pickId) {
          pickRef.child(pickId).once('value', function(pick) {
            deferred.resolve(pick.val());
          });
        } else {
          deferred.resolve(false);
        }
      });

      return deferred.promise;
    };

    // Creates a pick from the parameters and also
    // creates the corresponding index to find the player
    // by the pick id.
    pickService.createPick = function(params) {

      var pick = Pick.create(params),
          pickRef = new Firebase(PICK_URL),
          indexRef = new Firebase(PICKINDEX_URL);

      pickRef.child(pick.id).set(pick);
      indexRef.child(pick.playerId).set(pick.id);

      return pick;
    };

    pickService.loadPickData = function() {

      pickService.createPick({
        id: 1,
        playerId: '-JLjbRwFM-iAOdUUv1U3',
        teamId: 'HOU'
      });

      pickService.createPick({
        id: 2,
        playerId: '-JLjbRwHpTNXRcrD3FHQ',
        teamId: 'STL'
      });


    };

    return pickService;

  });

}(window, angular));
