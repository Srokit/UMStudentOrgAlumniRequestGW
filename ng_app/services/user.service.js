app.factory('userService', function () {

  var signedIn = false;
  var user= {
    id: '',
    email: '',
    name: '',
    profPicUrl: ''
  };

  return {
    setInfo: function(id, email, name, profPicUrl) {
      user.id = id;
      user.email = email;
      user.name = name;
      user.profPicUrl = profPicUrl;
    },
    getInfo: function () {
      return user;
    },
    setSignedIn: function (signedInIn) {
      signedIn = signedInIn;
    },
    getSignedIn: function () {
      return signedIn;
    }
  };
});
