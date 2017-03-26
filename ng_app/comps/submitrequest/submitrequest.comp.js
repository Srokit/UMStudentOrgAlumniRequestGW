app.component('submitrequest', {

  templateUrl: './comps/submitrequest/submitrequest.view.html',

  controller: function ($scope, $http, $location, userService, navlinksService, notificationService) {

    $scope.request = {

      eventName: '',
      details: '',
      subject: '',
      eventDatetime: ''
    };

    $scope.usingAlumniName = false;

    $scope.submitForm = function () {

      $http.post('/studentorg/alumnirequests/new',
        {
          request: $scope.request
        },
        {
        headers: {
          'user-token': userService.getToken()
        }
      }).then(function (response) {
        var data = response.data;

        if(data.success) {
          console.log("Submitted new request successfully");
          notificationService.setNotif("Submitted Alumni Requests Successfully");
          $location.path('/studentorgconsole');
        }
        else {
          console.error(data.msg);
        }
      });
    };

    $scope.start = function () {
      navlinksService.setNavlinks(['Back'], ['/#/studentorgconsole']);
    };

    $scope.start();
  }
})