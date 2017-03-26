app.component('studentorgconsole', {

  templateUrl: './comps/studentorgconsole/studentorgconsole.view.html',

  controller: function ($scope, $http, userService) {

    // If set then display a message that this student org account has not been approved
    $scope.waitingForApproval = false;

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
          if(data.waitForApproval) {

              $scope.waitingForApproval = true;

            console.log("User needs to wait for approval still");
          }
          else {
            console.error(data.msg);
          }

        }
      });
    };

    $scope.start();
  }
})