app.component('home', {
  templateUrl: './comps/home/home.view.html',

  controller: function ($scope, userService, navlinksService) {

    $scope.userType = '';
    $scope.isLoggedIn = false;

    $scope.start = function () {

      $scope.userType = userService.getUserType();
      $scope.isLoggedIn = userService.getSignedIn();

      if($scope.isLoggedIn && $scope.userType == 'so') {
        navlinksService.setNavlinks(['Go to Console'], ['/#/studentorgconsole']);
      }
      else if($scope.isLoggedIn && $scope.userType == 'ac') {
        navlinksService.setNavlinks(['Go to Console'], ['/#/acuserconsole_reqs']);
      }
    };

    $scope.start();
  }
});
