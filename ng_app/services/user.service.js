app.factory('userService', function () {

  var token = null;
  var signedIn = false;
  var userType = ''; // 'so' or 'ac'
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
    },
    setToken: function (tokenIn) {
      token = tokenIn;
    },
    setUserType: function (userTypeIn) {
      userType = userTypeIn;
    },
    getUserType: function () {
      return userType;
    },
    getToken: function () {
      return token;
    },
    emailIsUmich: function (email) {
      return (email.indexOf('@umich.edu') != -1);
    }
  };
});
