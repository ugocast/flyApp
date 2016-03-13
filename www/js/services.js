angular.module('starter.services', ['ngResource'])

.factory('Places', ['$resource',
  function($resource) {
    return $resource('http://0.0.0.0:3000/api/FirstLevels?filter[include]=places&filter[where][google_place_id]=:place_id', {}, {
      query: {
        method: 'GET',
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        isArray: true
      }
    });
  }
]).factory('Place', ['$resource',
  function($resource) {
    return $resource('http://0.0.0.0:3000/api/places/:placeId?filter[include]=fishes&filter[include]=flies&filter[include]=access&filter[include]=advertisements&filter[include]=insects', {}, {
      query: {
        method: 'GET',
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        isArray: false
      }
    });
  }
]).factory('GeneralRegulations', ['$resource',
  function($resource) {
    return $resource('https://apiflyapp-flyapp.rhcloud.com/api/Regions/XI/regulations', {}, {
      query: {
        method: 'GET',
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        isArray: true
      }
    });
  }
])

;
