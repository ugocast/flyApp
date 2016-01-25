angular.module('starter.services', ['ngResource'])

.factory('Places', ['$resource',
  function($resource) {
    return $resource('https://apiflyapp-flyapp.rhcloud.com/api/Regions/XI/places', {}, {
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
    return $resource('https://apiflyapp-flyapp.rhcloud.com/api/places/:placeId?filter[include]=informations&filter[include]=fishes&filter[include]=flies&filter[include]=access&filter[include]=map&filter[include]=advertisements&filter[include]=insects', {}, {
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
