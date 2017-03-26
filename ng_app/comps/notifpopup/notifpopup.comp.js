app.component('notifpopup', {
  
  templateUrl: './comps/notifpopup/notifpopup.view.html',
  
  controller: function ($scope, notificationService) {

    $scope.start = function () {

      notificationService.setNotifChangedCB(function (notif) {
        var snackbar = document.querySelector('#notifpopup').MaterialSnackbar;
        snackbar.showSnackbar({message: notif});
      });
    };
  }
});