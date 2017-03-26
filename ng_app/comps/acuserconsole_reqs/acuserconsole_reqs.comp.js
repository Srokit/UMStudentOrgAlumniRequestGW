app.component('acuserconsoleReqs', {

  templateUrl: './comps/acuserconsole_reqs/acuserconsole_reqs.view.html',

  controller: function ($scope, $http, userService, navlinksService, dateformatService) {

    $scope.pendingRequests = [];
    $scope.fulfilledRequests = [];
    $scope.rejectedRequests = [];
    $scope.newRequests = [];

    $scope.format = function (req) {
      return dateformatService.format(req);
    };

    $scope.handleReq = function (req) {
      $http.get('/acuser/alumnirequests/'+req._id+'/handle', {
        headers: {
          'user-token': userService.getToken()
        }
      }).then(function (response) {
        var data = response.data;
        if(data.success) {
          console.log("Successfully handledRequest");
          $scope.reload();
        }
        else {
          console.error(data.msg);
        }
      });
    };

    $scope.fulfillReq = function (req) {
      $http.get('/acuser/alumnirequests/'+req._id+'/fulfill', {
        headers: {
          'user-token': userService.getToken()
        }
      }).then(function (response) {
        var data = response.data;
        if(data.success) {
          console.log("Successfully fulfilled Request");
          $scope.reload();
        }
        else {
          console.error(data.msg);
        }
      });
    };

    $scope.rejectReq = function (req) {
      $http.get('/acuser/alumnirequests/'+req._id+'/reject', {
        headers: {
          'user-token': userService.getToken()
        }
      }).then(function (response) {
        var data = response.data;
        if(data.success) {
          console.log("Successfully rejected Request");
          $scope.start();
        }
        else {
          console.error(data.msg);
        }
      });
    };


    $scope.reload = function () {

      $http.get('/acuser/alumnirequests/all', {
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

    $scope.start = function () {
      navlinksService.setNavlinks(['Manage Student Organizations'], ['/#/acuserconsole_sos']);

      $scope.reload();
    };

    // Call on component initialized
    $scope.start();
  }
})
