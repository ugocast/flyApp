angular.module('starter.services', ['ngResource'])

.factory('Places', ['$resource',
  function($resource) {
    return $resource('https://apiflyapp-flyapp.rhcloud.com/api/Language_Countries/es_cl/first_Levels?filter[include]=places&filter[where][google_place_id]=:place_id', {}, {
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
    return $resource('https://apiflyapp-flyapp.rhcloud.com/api/places/:placeId?filter[include]=fishes&filter[include]=flies&filter[include]=access&filter[include]=advertisements&filter[include]=insects', {}, {
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
]).factory('Wheater', ['$resource',
  function($resource) {
    return $resource('http://api.openweathermap.org/data/2.5/weather?lat=:lat&lon=:long&appid=1139cd761d2a7e1e0f8204d97fbcabe2&lang=es&units=metric', {}, {
      query: {
        method: 'GET',
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        isArray: false
      }
    });
  }
])

;
