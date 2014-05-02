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
        delete pickModel.downVoteCount;
        delete pickModel.upVoteCount;
        delete pickModel.score;
      }

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

    function createOrderPick(team, playerId) {
        return {
          teamId: team,
          playerId: playerId
        };
      }

    pickService.simulate = function() {

      var draftOrder = [
        createOrderPick('HOU', '-JLjbRwFM-iAOdUUv1U3'),
        createOrderPick('STL', '-JLjbRwHpTNXRcrD3FHR'),
        createOrderPick('JAX', '-JLjbRwHpTNXRcrD3FHS'),
        createOrderPick('CLE', '-JLjbRwHpTNXRcrD3FHQ'),
        createOrderPick('OAK', '-JLjbRwHpTNXRcrD3FHP'),
        createOrderPick('ATL', '-JLjbRwKKWqVLFG-VYNo'),
        createOrderPick('TB', '-JLjbRwJLmMKvgHhyJ5q'),
        createOrderPick('MIN', '-JLjbRwIPbXl-Txtf1F4'),
        createOrderPick('BUF', '-JLjbRwKKWqVLFG-VYNq'),
        createOrderPick('DET', '-JLjbRwO0Th3SBivmyqA'),
        createOrderPick('TEN', '-JLjbRwLC4ooaieLVege'),
        createOrderPick('NYG', '-JLjbRwJLmMKvgHhyJ5p'),
        createOrderPick('STL', '-JLjbRwKKWqVLFG-VYNn'),
        createOrderPick('CHI', '-JLjbRwKKWqVLFG-VYNm'),
        createOrderPick('PIT', '-JLjbRwNaEnq4k3b9e5W'),
        createOrderPick('DAL', '-JLjbRwQ1a_UIlbg1ZoF'),
        createOrderPick('BAL', '-JLjbRwLC4ooaieLVegd'),
        createOrderPick('NYJ', '-JLjbRwKKWqVLFG-VYNl'),
        createOrderPick('MIA', '-JLjbRwQ1a_UIlbg1ZoH'),
        createOrderPick('ARI', '-JLjbRwKKWqVLFG-VYNp'),
        createOrderPick('GB', '-JLjbRwS-EPF59kevujz'),
        createOrderPick('PHI', '-JLjbRwNaEnq4k3b9e5X'),
        createOrderPick('KC', '-JLjbRwLC4ooaieLVegc'),
        createOrderPick('CIN', '-JLjbRwM_WPmybMpJWLO'),
        createOrderPick('SD', '-JLjbRwO0Th3SBivmyqC'),
        createOrderPick('CLE', '-JLjbRwNaEnq4k3b9e5Y'),
        createOrderPick('NO', '-JLjbRwO0Th3SBivmyqB'),
        createOrderPick('CAR', '-JLjbRwM_WPmybMpJWLP'),
        createOrderPick('NE', '-JLjbRwM_WPmybMpJWLS'),
        createOrderPick('SF', '-JLjbRwO0Th3SBivmyq9'),
        createOrderPick('DEN', '-JLjbRwQ1a_UIlbg1ZoB'),
        createOrderPick('SEA', '-JLjbRwTzjYtw4Ztl3pR')
      ];

      var count = 0;

      var draftInterval = setInterval(function() {
        var current;

        if ((count + 1) === draftOrder.length) {
          clearInterval(draftInterval);
        }

        current = draftOrder[count];

        pickService.createPick({
          id: count + 1,
          playerId: current.playerId,
          teamId: current.teamId
        });

        count++;
      }, 1000);


    };

    return pickService;

  });

}(window, angular));
