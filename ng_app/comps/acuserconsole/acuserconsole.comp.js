app.component('acuserconsole', {

  templateUrl: './comps/acuserconsole/acuserconsole.view.html',

  controller: function ($scope, $http, $location, $window, userService) {

    $scope.pendingStudentOrgs = [];
    $scope.approvedStudentOrgs = [];

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
          $scope.start();
          console.log("Accepted response successfully");
        }
        else {
          console.error(data.msg);
        }
      });
    };

    $scope.rejectSO = function (studentOrgIn) {
      var _id = studentOrgIn._id;

      $http.get('/acuser/studentorgs/'+_id+'/reject', {
        headers: {
          'user-token': userService.getToken()
        }
      }).then(function (response) {
        var data = response.data;
        if(data.success) {
          // Reload
          $scope.start();
          console.log("Rejected response successfully");
        }
        else {
          console.error(data.msg);
        }
      });
    };

    $scope.start = function () {

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

    // Call on component initialized
    $scope.start();
  }
});
