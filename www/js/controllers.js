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

.controller('PlaceDetailCtrl', function($scope, $rootScope, $stateParams, Place, $ionicSlideBoxDelegate, $ionicScrollDelegate, $cordovaInAppBrowser) {

  $rootScope.placeId = $stateParams.placeId;

  Place.query({
    placeId: $stateParams.placeId
  }, function(data) {
    $scope.place = data;
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
