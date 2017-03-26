app.factory('notificationService', function () {

  var notifChangedCB = function (notif) {
  };

  return {

    setNotifChangedCB: function (cb) {
      notifChangedCB = cb;
    },
    setNotif: function(notif) {
      notifChangedCB(notif);
    }
  };
});