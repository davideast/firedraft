(function() {
  'use strict';

  angular
    .module('firedraftApp', [
      'ngCookies',
      'ngResource',
      'ngSanitize',
      'ngRoute'
    ])
    .config(function ($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'views/player.html',
          controller: 'PlayerCtrl'
        })
        .otherwise({
          redirectTo: '/'
        });
    })
    .constant('FBURL', 'https://firedraft.firebaseio.com/')
    .constant('PLAYER_URL', 'https://firedraft.firebaseio.com/players')
    .constant('TEAM_URL', 'https://firedraft.firebaseio.com/teams')
    .constant('NAMEINDEX_URL', 'https://firedraft.firebaseio.com/nameIndex');

}(window, window.angular));
