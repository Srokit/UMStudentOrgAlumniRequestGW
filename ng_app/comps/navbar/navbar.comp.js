app.component('navbar', {
  templateUrl: './comps/navbar/navbar.view.html',
  
  controller: function ($scope, $http, userService) {

    $scope.signedIn = false;
    $scope.user = {};

    $scope.processAuthSuccess = function (googleUser) {

      var prof = googleUser.getBasicProfile();

      $scope.$apply(function () {
        var profPicUrl = prof.Paa;

        userService.setInfo(prof.getId(), prof.getEmail(), prof.getName(), profPicUrl);
        userService.setSignedIn(true);

        $scope.user = userService.getInfo();
      });
    };

    $scope.processAuthFail = function (error) {
      userService.setInfo(null, null, null, null);
      userService.setSignedIn(false);
      $scope.signedIn = false;
    };

    $scope.renderSigninButton = function () {
      gapi.signin2.render('googleSigninBtn',
        {
          'scope': 'profile email',
          'onsuccess': $scope.processAuthSuccess,
          'onfailure': $scope.processAuthFail
        }
      );
    };

    $scope.signout = function () {
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function() {
        $scope.$apply(function () {
          $scope.signedIn = false;
        });
      });
    };
  }
})