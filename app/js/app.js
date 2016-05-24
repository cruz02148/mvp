angular.module('app', [])

.controller('PhotoController', function ($scope, $http, Photos) {
  // this.client_id = 'd49da08a520f47cbb6e7618f077f33ef';
  // this.access_token = '227333075.5b3fcaa.02d08e7a20d8495d8ecee250d0fd8e4a';
  $scope.$watch('search', function () {
    fetch();
  });
  
  function fetch() {
    Photos.getPhotos($scope.search)
    //console.log($scope.search)
    .then(function (data) {
      $scope.photos = data;
    })
    .catch(function (err) {
      console.error(err);
    });
  }
})


.factory('Photos', function ($http) {
  var photos = [];
  
  var getPhotos = function (tagName) {
    return $http({
      method: 'GET',
      url:  'https://api.instagram.com/v1/tags/' + tagName + 
            '/media/recent?client_id=' + 'd49da08a520f47cbb6e7618f077f33ef'
    })
    .then(function (response) {
      photos = response.data.data;
      return photos;
    })
  };
  
  return {
    photos: photos,
    getPhotos: getPhotos
  };
})