app.component('requestdetails', {
  
  templateUrl: './comps/requestdetails/requestdetails.view.html',
  
  controller: function ($scope, $http, $stateParams, userService, dateformatService, navlinksService) {

    $scope.request = {};

    $scope.format = dateformatService.format;

    $scope.start = function () {

      if(userService.getUserType() == 'so') {
        navlinksService.setNavlinks(['Back'], ['/#/studentorgconsole']);
        $http.get('/studentorg/alumnirequests/'+$stateParams.requestId, {
          headers: {
            'user-token': userService.getToken()
          }
        }).then(function (response) {
          var data = response.data;
          if(data.success) {
            $scope.request = data.request;
          }
        });
      }
      else {
        navlinksService.setNavlinks(['Back'], ['/#/acuserconsole_reqs']);
        $http.get('/acuser/alumnirequests/'+$stateParams.requestId, {
          headers: {
            'user-token': userService.getToken()
          }
        }).then(function (response) {
          var data = response.data;
          if(data.success) {
            $scope.request = data.request;
          }
        });
      }
    };

    $scope.start();
  }
})