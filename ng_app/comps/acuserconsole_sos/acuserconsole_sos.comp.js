app.component('acuserconsoleSos', {

  templateUrl: './comps/acuserconsole_sos/acuserconsole_sos.view.html',

  controller: function ($scope, $http, $location, $window, userService, navlinksService, dateformatService, notificationService) {

    // These booleans should not be true or false at same time
    // They determine what view will be showing in main part of console
    $scope.showStudentOrgs = false;
    $scope.showAlumniRequests = false;

    $scope.pendingStudentOrgs = [];
    $scope.approvedStudentOrgs = [];

    $scope.format = function (req) {
      return dateformatService.format(req);
    };

    $scope.approveSO = function(studentOrgIn) {
      var _id = studentOrgIn._id;

      $http.get('/acuser/studentorgs/'+_id+'/approve', {
        headers: {
          'user-token': userService.getToken()
        }
      }).then(function (response) {
        var data = response.data;
        if(data.success) {
          // Reload
          $scope.reload();
          console.log("Accepted response successfully");
          notificationService.setNotif("Approved Student Org Account successfully");
        }
        else {
          console.error(data.msg);
        }
      });
    };

    $scope.reload = function () {

      $http.get('/acuser/studentorgs/all', {
        headers: {
          'user-token': userService.getToken()
        }
      }).then(function (response) {
        var data = response.data;
        if(data.success) {
          $scope.pendingStudentOrgs = data.pendingStudentOrgs;
          $scope.approvedStudentOrgs = data.approvedStudentOrgs;
          $scope.rejectedStudentOrgs = data.rejectedStudentOrgs;
        }
        else {
          console.error(data.msg);
        }
      });
    };

    $scope.start = function () {

      navlinksService.setNavlinks(['Manage Alumni Requests'], ['/#/acuserconsole_reqs']);

      $scope.reload();
    };

    // Call on component initialized
    $scope.start();
  }
});
