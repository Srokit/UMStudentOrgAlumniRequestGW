app.component('studentorgconsole', {

  templateUrl: './comps/studentorgconsole/studentorgconsole.view.html',

  controller: function ($scope, $http, userService) {

    $scope.pendingRequests = [];
    $scope.fulfilledRequests = [];
    $scope.rejectedRequests = [];
    $scope.newRequests = [];

    $scope.start = function () {

      $http.get('/studentorg/alumnirequests/all', {
        headers: {
          'user-token': userService.getToken()
        }
      }).then(function (response) {
        var data = response.data;
        if(data.success) {
          $scope.pendingRequests = data.pendingRequests;
          $scope.fulfilledRequests = data.fulfilledRequests;
          $scope.rejectedRequests = data.rejectedRequests;
          $scope.newRequests = data.newRequests;
        }
        else {
          console.error(data.msg);
        }
      });
    };

    $scope.start();
  }
})