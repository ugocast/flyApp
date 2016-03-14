angular.module('starter.controllers', [])

.controller('PlacesCtrl', function($scope, $rootScope, Places) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  Places.query({
    place_id: 'ChIJEW0Xuf2kir0R8_7BupS9_Ms'
  }, function(data) {
    $scope.places = data[0].places;
    $scope.$broadcast('scroll.refreshComplete');
  })

  $scope.doRefresh = function() {

    Places.query({
      place_id: "ChIJEW0Xuf2kir0R8_7BupS9_Ms"
    }, function(data) {
      $scope.places = data[0].places;
      $scope.$broadcast('scroll.refreshComplete');
    })

  };

})

.controller('GeneralRegulationCtrl', function($scope, $rootScope, GeneralRegulations) {

  GeneralRegulations.query(function(data) {
    $scope.regulations = data;

  });

  $scope.doRefresh = function() {
    GeneralRegulations.query(function(data) {
      $scope.regulations = data;
      $scope.$broadcast('scroll.refreshComplete');
    })

  };

})

.controller('PlaceDetailCtrl', function($scope, $rootScope, $stateParams, Place, Wheater, $ionicSlideBoxDelegate, $ionicScrollDelegate, $cordovaInAppBrowser, $cordovaGeolocation) {

    $rootScope.placeId = $stateParams.placeId;

    Place.query({
      placeId: $stateParams.placeId
    }, function(data) {
      $scope.place = data;
      Wheater.query({
        lat: $scope.place.coordinates[0].lat,
        long: $scope.place.coordinates[0].lng
      }, function(data) {
        $scope.wheater = data;
      });

      $ionicScrollDelegate.resize();
      $ionicSlideBoxDelegate.update();
    });

    var options = {
      location: 'yes',
      clearcache: 'yes',
      toolbar: 'yes'
    };


    $scope.openLink = function(link) {

      $cordovaInAppBrowser.open(link, '_system', options)
        .then(function(event) {
          // success
          $cordovaInAppBrowser.close();
        })
        .catch(function(event) {
          // error
          $cordovaInAppBrowser.close();

        });

    };



  })
  .controller('MapCtrl', function($scope, $rootScope, $stateParams, Place, Wheater, $ionicSlideBoxDelegate, $ionicScrollDelegate, $cordovaInAppBrowser, $cordovaGeolocation) {

    $scope.map = {
      center: {
        latitude: 40.1451,
        longitude: -99.6680
      },
      zoom: 8
    };
    $scope.options = {
      scrollwheel: true
    };
    $scope.markers = []
      // get position of user and then set the center of the map to that position
    $cordovaGeolocation
      .getCurrentPosition()
      .then(function(position) {
        var lat = position.coords.latitude
        var long = position.coords.longitude
        $scope.map = {
          center: {
            latitude: lat,
            longitude: long
          },
          zoom: 16
        };
        //just want to create this loop to make more markers
        for (var i = 0; i < 3; i++) {
          $scope.markers.push({
            id: $scope.markers.length,
            latitude: lat + (i * 0.002),
            longitude: long + (i * 0.002),
            title: 'm' + i
          })
        }

        $ionicScrollDelegate.resize();
        $ionicSlideBoxDelegate.update();

      }, function(err) {
        // error
      });

  })
