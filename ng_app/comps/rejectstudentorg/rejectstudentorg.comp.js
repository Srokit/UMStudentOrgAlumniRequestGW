app.component('rejectstudentorg', {

  templateUrl: './comps/rejectstudentorg/rejectstudentorg.view.html',

  controller: function ($scope, $location, $stateParams, $http, userService, navlinksService, notificationService) {

    $scope.orgName = '';
    $scope.reason = '';
    $scope.studentOrg = null;

    $scope.reject = function () {

      $http.get('/acuser/studentorgs/'+$scope.studentOrg._id+'/reject?reason='+$scope.reason, {
        headers: {
          'user-token': userService.getToken()
        }
      }).then(function (response) {
        var data = response.data;
        if(data.success) {
          console.log("Rejected student successfully");
          notificationService.setNotif("Denied student org "+$scope.studentOrg.orgName+" successfully");
          $location.path('/acuserconsole_reqs');
        }
      });
    };

    $scope.reload = function () {

      $http.get('/acuser/studentorgsById/'+$stateParams.studentOrgId, {
        headers: {
          'user-token': userService.getToken()
        }}).then(function (response) {
        var data = response.data;
        if(data.success) {
            $scope.studentOrg = data.studentOrg;
            $scope.orgName = data.studentOrg.orgName;
        }
      });
    };

    $scope.start = function () {
      navlinksService.setNavlinks(['Back'], ['/#/acuserconsole_sos']);
      $scope.reload();
    };

    $scope.start();
  }
});