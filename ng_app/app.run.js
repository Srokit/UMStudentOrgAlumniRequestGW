app.run(function () {
  
  gapi.load('auth2', function () {
    gapi.auth2.init({
      client_id: '288046323667-f1ehoqdo84dqopeme4u1tp0pa4rv2tnp.apps.googleusercontent.com'
    });
  });
});