angular.module('starter.controllers', [])

.controller('PlacesCtrl', function($scope, $rootScope, Places, $cordovaGeolocation, $log, $cordovaInAppBrowser, $ionicPlatform) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $ionicPlatform.ready(function() {

    /*  var scheme;

      // Don't forget to add the org.apache.cordova.device plugin!
      if(device.platform === 'iOS') {
          scheme = 'twitter://';
      }
      else if(device.platform === 'Android') {
          scheme = 'com.twitter.android';
      }

      appAvailability.check(
          scheme, // URI Scheme
          function() {  // Success callback
              window.open('twitter://user?screen_name=gajotres', '_system', 'location=no');
              console.log('Twitter is available');
          },
          function() {  // Error callback
              window.open('https://twitter.com/gajotres', '_system', 'location=no');
              console.log('Twitter is not available');
          }
      );*/


    // get position of user and then set the center of the map to that position
    $cordovaGeolocation
      .getCurrentPosition()
      .then(function(position) {
        $scope.currentLat = position.coords.latitude;
        $scope.currentLng = position.coords.longitude;
        $scope.locationEnable = true;
      }, function(err) {
        $scope.locationEnable = false;
        $log.info(err);
      });

    Places.query({
      place_id: 'ChIJEW0Xuf2kir0R8_7BupS9_Ms'
    }, function(data) {
      $scope.places = data[0].places;
      $scope.$broadcast('scroll.refreshComplete');
    });
  });


  $scope.distanceFromCurrent = function(coordinates) {
    var heading = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng($scope.currentLat, $scope.currentLng), new google.maps.LatLng(coordinates[0].lat, coordinates[0].lng));
    distanceFromCurrent = heading / 1000;
    return distanceFromCurrent;
  }

  $scope.doRefresh = function() {
    Places.query({
      place_id: "ChIJEW0Xuf2kir0R8_7BupS9_Ms"
    }, function(data) {
      $scope.places = data[0].places;
      $scope.$broadcast('scroll.refreshComplete');
    })

  };

  $rootScope.resizeCloudinaryImage = function(url_image,modifier) {
    var replace="upload";
    return url_image.replace(replace,replace+modifier);
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

.controller('ConditionCtrl', function($scope, $rootScope, GeneralRegulations) {

})

.controller('LanguageCtrl', function($scope, $rootScope, GeneralRegulations) {

})

.controller('PlaceDetailCtrl', function($scope, $rootScope, $stateParams, Place, Wheater, $ionicSlideBoxDelegate, $ionicScrollDelegate, $cordovaInAppBrowser, $cordovaGeolocation,$log) {

    Place.query({
      placeId: $stateParams.placeId
    }, function(data) {
      $rootScope.place = data;
      Wheater.query({
        lat: $rootScope.place.coordinates[0].lat,
        long: $rootScope.place.coordinates[0].lng
      }, function(data) {
        $rootScope.wheater = data;
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

    $scope.currentMonthlyAverage = function(average) {
      if(average!=null){
      var currentMonth = parseInt(new Date().getMonth());
      return average[currentMonth]==null?"":average[currentMonth];
    }
    };


  })
  .controller('MapCtrl', function($scope, $rootScope, $stateParams, Place, Wheater, $ionicSlideBoxDelegate, $ionicScrollDelegate, $cordovaInAppBrowser, $cordovaGeolocation) {

    $scope.options = {
      scrollwheel: true
    };
    $scope.markers = []
      // get position of user and then set the center of the map to that position
    $cordovaGeolocation
      .getCurrentPosition()
      .then(function(position) {
        var lat = $rootScope.place.coordinates[0].lat;
        var long = $rootScope.place.coordinates[0].lng;
        $scope.map = {
          center: {
            latitude: lat,
            longitude: long
          },
          zoom: 10
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
