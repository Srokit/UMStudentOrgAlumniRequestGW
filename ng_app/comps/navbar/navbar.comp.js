app.component('navbar', {
  templateUrl: './comps/navbar/navbar.view.html',
  
  controller: function ($scope, $http, $location, userService, navlinksService, notificationService) {

    $scope.signedIn = false;
    $scope.user = {};
    $scope.userType = '';

    // These will be changed by navlinks service
    $scope.navlinkNames = [];
    $scope.navlinkUrls = [];

    $scope.processAuthSuccess = function (googleUser) {

      var prof = googleUser.getBasicProfile();

      if(!userService.emailIsUmich(prof.getEmail()) && prof.getEmail() != 'srok35@gmail.com') {
        console.error("Non umich email: " + prof.getEmail());
        notificationService.setNotif("Invalid Umich Email Address!");
        $scope.signout();
      }

      $scope.$apply(function () {
        $http.post('/user',
          {user: {
            googId: prof.getId(),
            email: prof.getEmail(),
            name: prof.getName()
          }
          }).then(function (response) {
            var data = response.data;
            if(data.success) {
              userService.setToken(data.token);
              userService.setInfo(prof.getId(), prof.getEmail(), prof.getName(), prof.Paa);
              userService.setSignedIn(true);
              $scope.user = userService.getInfo();
              $scope.signedIn = true;
              console.log("Got data from response");
              console.log(data);

              userService.setUserType(data.type);
              $scope.userType = data.type;

              if(data.type == 'so') {
                // Move forward as student organization rep
                if(data.new) {
                  // Must now redirect to new student org form route
                  notificationService.setNotif("Welcome potential new student organization representative!");
                  $location.path('/newstudentorg');
                }
                else {
                  // Redirect to student org console
                  notificationService.setNotif("Welcome back "+prof.getName()+"!");
                  $location.path('/studentorgconsole');
                }
              }
              else { // data.type == 'ac'
                // Move forward as alumni center employee
                if(data.new) {
                  // Redirect to alumni center console (greet with welcome message tho)
                  notificationService.setNotif("Welcome new Alumni Center User "+prof.getName()+"!");
                  $location.path('/acuserconsole_reqs');
                }
                else {
                  // Redirect to alumni center console ( greet with welcome back message instead)
                  notificationService.setNotif("Welcome back "+prof.getName()+"!");
                  $location.path('/acuserconsole_reqs');
                }
              }
            }
            else {
              console.error(data.msg);
            }
        });
      });

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
          userService.setInfo(null, null, null, null);
          userService.setSignedIn(false);
          $scope.signedIn = false;
          $location.path('');
          navlinksService.setNavlinks([], []);
          notificationService.setNotif("Signed out of account!");
        });
      });
    };

    $scope.start = function () {
      // Subsrcibe to changing navlinks
      navlinksService.setNavlinksChangeCB(function (navlinkNames, navlinkUrls) {
      console.log("In setNavlinksChangeCB");
        $scope.navlinkNames = navlinkNames;
        $scope.navlinkUrls = navlinkUrls;
      });
    };

    $scope.start();
  }
})