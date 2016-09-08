// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','firebase','starter.controllers', 'starter.services'])

.run(function($ionicPlatform, $rootScope, $state, AuthFactory) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams, error) {
      AuthFactory.$onAuthStateChanged(function(firebaseUser) {
        console.log(firebaseUser);
        if(firebaseUser) {
          $state.go('home');
        }
      });
    });

    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
      if (error === "AUTH_REQUIRED") {
        $state.go('signIn');
      }
    });
  });
})


.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/home',
        controller: 'HomeCtrl',
        templateUrl: '/templates/home.html',
        resolve: {
          'currentAuth':  function(AuthFactory) {
            return AuthFactory.$requireSignIn();
          }
        }
      })
      .state('new', {
        url: '/new',
        controller: 'AudioRecorderCtrl',
        templateUrl: '/templates/new.html',
        resolve: {
          'currentAuth': function(AuthFactory) {
            return AuthFactory.$requireSignIn();
          }
        }
      })
      .state('signIn', {
        url: '/signIn',
        controller: 'AuthenticationCtrl',
        templateUrl: '/templates/signIn.html',
        resolve: {
          'currentAuth': function(AuthFactory) {
            return AuthFactory.$waitForSignIn();
          }
        }
      })
      .state('profile', {
        url: '/profile',
        controller: "EditProfileCtrl",
        templateUrl: '/templates/edit_profile.html',
        resolve: {
          'currentAuth': function(AuthFactory) {
            return AuthFactory.$requireSignIn();
          }
        }
      });

    //$urlRouterProvider.otherwise('/signIn');

  });
