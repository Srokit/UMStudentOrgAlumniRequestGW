app.component('newstudentorg', {

  templateUrl: './comps/newstudentorg/newstudentorg.view.html',

  controller: function ($scope, $http, $location, userService) {

    $scope.orgName = '';
    $scope.planOfUse = '';

    $scope.submitForm = function () {

      var userInfo = userService.getInfo();
      $http.post('/studentorg/new', {
        name: $scope.orgName,
        planOfUse: $scope.planOfUse,
        repInfo: {
          googId: userInfo.id,
          email: userInfo.email,
          name: userInfo.name
        }
      }, {
        headers: {
          'user-token': userService.getToken(),
          'Content-Type': 'application/json'
        }
      }).then(function (response) {
        var data = response.data;
        if(data.success) {
          console.log("Submitted new Org successfully");
          $location.path('/studentorgconsole');
        }
        else {
          console.error(data.msg);
        }
      });
    }
  }
});
