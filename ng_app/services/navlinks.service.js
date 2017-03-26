app.factory('navlinksService', function () {

  var navlinksChangedCB = function (navlinkNames, navlinkUrls) {
  };

  return {

    setNavlinksChangeCB: function(cb) {
      navlinksChangedCB = cb;
    },
    setNavlinks: function (navlinkNames, navlinkUrls) {
      navlinksChangedCB(navlinkNames, navlinkUrls);
    }
  };
});