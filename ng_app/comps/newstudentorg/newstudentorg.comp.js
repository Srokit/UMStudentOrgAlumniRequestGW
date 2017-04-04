app.component('newstudentorg', {

  templateUrl: './comps/newstudentorg/newstudentorg.view.html',

  controller: function ($scope, $http, $location, userService, notificationService) {

    // For Select box
    $scope.orgTypesList = ['Academic/Honor Society', 'Activism', 'Central campus', 'Creative and Performing arts',
    'Cultural/Ethnic', 'Department', 'Environmental', 'Gender/Sexuality', 'Governance', 'Graduate/Professional',
    'Health & Wellness', 'Media and Creative Writing', 'Medical Campus', 'North Campus', 'Religious/Spiritual',
      'Science & Technology', 'Service/Service Learning', 'Social Fraternity/Sorority', 'South Campus',
      'Sport Clubs & Recreation'];

    $scope.primaryPlansOfUseList = ['Speakers', 'Workshops', 'Mentorship', 'Other'];

    $scope.orgName = '';
    $scope.planOfUse = '';
    $scope.orgType = '';
    $scope.additionalComments = '';

    $scope.submitForm = function () {

      var userInfo = userService.getInfo();
      $http.post('/studentorg/new', {
        name: $scope.orgName,
        planOfUse: $scope.planOfUse,
        orgType: $scope.orgType,
        additionalComments: $scope.additionalComments,
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
          notificationService.setNotif("Submitted New Student Org Successfully");
          $location.path('/studentorgconsole');
        }
        else {
          console.error(data.msg);
        }
      });
    }
  }
});
