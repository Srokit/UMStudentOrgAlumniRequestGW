app.component('fulfillrequest', {

  templateUrl: './comps/fulfillrequest/fulfillrequest.view.html',

  controller: function ($scope, $http, $location, $stateParams, userService, navlinksService, notificationService) {

    $scope.orgName = '';
    $scope.request = null;
    $scope.alumniNames = "";
    $scope.alumniEmails = "";

    $scope.fulfill = function () {

      console.log($scope.alumniNames);
      console.log($scope.alumniEmails);

      var alumniNames = $scope.alumniNames.split('\n');
      var alumniEmails = $scope.alumniEmails.split('\n');

      $http.post('/acuser/alumnirequests/' + $stateParams.requestId + '/fulfill',
        {
          alumniNames: alumniNames,
          alumniEmails: alumniEmails
        },
        {
        headers: {
          'user-token': userService.getToken()
        }
      }).then(function (response) {
        var data = response.data;
        if (data.success) {
          console.log("Fulfilled request successfully");
          notificationService.setNotif("Fulfilled request successfully");
          $location.path('/acuserconsole_reqs');
        }
      });
    };

    $scope.reload = function () {

      $http.get('/acuser/alumnirequests/' + $stateParams.requestId, {
        headers: {
          'user-token': userService.getToken()
        }
      }).then(function (response) {
        var data = response.data;
        if (data.success) {
          var request = data.request;
          $scope.request = request;
          $http.get('/acuser/studentorgs/' + request.studentOrgGoogId, {
            headers: {
              'user-token': userService.getToken()
            }
          }).then(function (response) {
            var data = response.data;
            if (data.success) {
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