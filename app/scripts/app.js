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
        .when('/players', {
          templateUrl: 'views/player.html',
          controller: 'PlayerCtrl'
        })
        .when('/live', {
          templateUrl: 'views/live.html',
          controller: 'LiveCtrl'
        })
        .otherwise({
          redirectTo: '/'
        });
    })
    .constant('FBURL', 'https://firedraft.firebaseio.com/')
    .constant('PLAYER_URL', 'https://firedraft.firebaseio.com/players')
    .constant('TEAM_URL', 'https://firedraft.firebaseio.com/teams')
    .constant('PICK_URL', 'https://firedraft.firebaseio.com/picks')
    .constant('PICKINDEX_URL', 'https://firedraft.firebaseio.com/pickIndex')
    .constant('NAMEINDEX_URL', 'https://firedraft.firebaseio.com/nameIndex');

}(window, window.angular));
