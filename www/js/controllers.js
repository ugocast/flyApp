angular.module('starter.controllers', [])

.controller('PlacesCtrl', function($scope, $rootScope, Places) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  Places.query(function(data) {
    $scope.places = data;
  });

  $scope.doRefresh = function() {
    Places.query(function(data) {
      $scope.places = data;
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

.controller('BackCtrl', function($scope, $rootScope, $ionicHistory, $location, $log) {

  $scope.myGoBack = function() {
    $log.log($location.path());
    if ($location.path() != "/tab/regulations") {
      
      $rootScope.placeId = null;
    }
    $ionicHistory.goBack();
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
