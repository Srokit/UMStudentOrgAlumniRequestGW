app.component('rejectrequest', {

  templateUrl: './comps/rejectrequest/rejectrequest.view.html',

  controller: function ($scope, $http, $location, $stateParams, userService, navlinksService, notificationService) {

    $scope.orgName = '';
    $scope.request = null;
    $scope.reason = '';

    $scope.reject = function () {

      $http.get('/acuser/alumnirequests/'+$scope.request._id+'/reject?reason='+$scope.reason, {
        headers: {
          'user-token': userService.getToken()
        }
      }).then(function (response) {
        var data = response.data;
        if(data.success) {
          console.log("Rejected request successfully");
          notificationService.setNotif("Rejected request successfully");
          $location.path('/acuserconsole_reqs');
        }
      });
    };

    $scope.reload = function () {

      $http.get('/acuser/alumnirequests/'+$stateParams.requestId, {
        headers: {
        'user-token': userService.getToken()
      }}).then(function (response) {
        var data = response.data;
        if(data.success) {
          var request = data.request;
          $scope.request = request;
          $http.get('/acuser/studentorgs/'+request.studentOrgGoogId, {
            headers: {
              'user-token': userService.getToken()
            }
          }).then(function (response) {
            var data = response.data;
            if(data.success) {
              var studentOrg = data.studentOrg;
              $scope.orgName = studentOrg.orgName;
            }
          });
        }
      });
    };

    $scope.start = function () {
      navlinksService.setNavlinks(['Back'], ['/#/acuserconsole_reqs']);
      $scope.reload();
    };

    $scope.start();
  }
});