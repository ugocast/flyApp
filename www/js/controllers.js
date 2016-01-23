angular.module('starter.controllers', [])

.controller('PlacesCtrl', function($scope, Places) {
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

.controller('PlaceDetailCtrl', function($scope, $stateParams, Place, $ionicSlideBoxDelegate,$ionicScrollDelegate,$cordovaInAppBrowser) {
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
