app.component('studentorgconsole', {

  templateUrl: './comps/studentorgconsole/studentorgconsole.view.html',

  controller: function ($scope, $http, userService, dateformatService, navlinksService) {

    // If set then display a message that this student org account has not been approved
    $scope.waitingForApproval = false;

    $scope.orgName = '';

    $scope.pendingRequests = [];
    $scope.fulfilledRequests = [];
    $scope.rejectedRequests = [];
    $scope.newRequests = [];

    $scope.format = dateformatService.format;

    $scope.start = function () {

      navlinksService.setNavlinks(['Make New Request'], ['/#/submitrequest']);

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

            navlinksService.setNavlinks([], []);

            console.log("User needs to wait for approval still");
          }
          else {
            console.error(data.msg);
          }

        }
      });

      $http.get('/studentorg/me', {
        headers: {
          'user-token': userService.getToken()
        }
      }).then(function (response) {
        var data = response.data;
        if(data.success) {
          $scope.orgName = data.studentOrg.orgName;
        }
      });
    };

    $scope.start();
  }
})