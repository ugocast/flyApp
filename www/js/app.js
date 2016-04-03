// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ngCordova', 'starter.controllers', 'starter.services','uiGmapgoogle-maps'])

.run(function($ionicPlatform, $ionicPopup, $ionicLoading, $rootScope) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)

    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }

    if (window.Connection) {
      if (navigator.connection.type == Connection.NONE) {
        $ionicPopup.confirm({
            title: "Internet Disconnected",
            content: "The internet is disconnected on your device."
          })
          .then(function(result) {
            if (!result) {
              ionic.Platform.exitApp();
            }
          });
      }
    }

  });

  $rootScope.$on('loading:show', function() {
    $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: false,
      maxWidth: 200,
      showDelay: 0
    })
  });

  $rootScope.$on('loading:hide', function() {
    $ionicLoading.hide()
  });

})


.config(function($stateProvider, $urlRouterProvider,$compileProvider) {


  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|javascript|comgooglemaps):/);


  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:


  .state('tab.places', {
      url: '/places',
      views: {
        'tab-places': {
          templateUrl: 'templates/tab-places.html',
          controller: 'PlacesCtrl'
        }
      }
    }).state('tab.regulations', {
      url: '/regulations',
      views: {
        'tab-regulations': {
          templateUrl: 'templates/tab-regulations.html',
          controller: 'GeneralRegulationCtrl'
        }
      }
    })
    .state('tab.map', {
      url: '/places/:placeId/map',
      views: {
        'tab-places': {
          templateUrl: 'templates/tab-map.html',
          controller: 'MapCtrl'
        }
      }
    })
    .state('tab.place-detail', {
      url: '/places/:placeId',
      views: {
        'tab-places': {
          templateUrl: 'templates/place-detail.html',
          controller: 'PlaceDetailCtrl'
        }
      }
    })


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/places');

}).config(['$httpProvider', function($httpProvider) {
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];

  $httpProvider.interceptors.push(function($rootScope) {
    return {
      request: function(config) {
        $rootScope.$broadcast('loading:show')
        return config
      },
      response: function(response) {
        $rootScope.$broadcast('loading:hide')
        return response
      }
    }
  })

}]).directive('hideTabs', function($rootScope) {
  return {
    restrict: 'A',
    link: function($scope, $el) {
      $rootScope.hideTabs = true;
      $scope.$on('$destroy', function() {
        $rootScope.hideTabs = true;
      });
    }
  };
}).config(
  ['uiGmapGoogleMapApiProvider', function(GoogleMapApiProviders) {
    GoogleMapApiProviders.configure({
      china: true
    });
  }]
);
