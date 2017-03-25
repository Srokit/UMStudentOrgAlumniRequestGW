app.config(function ($stateProvider) {

  $stateProvider.state({
    name: 'root',
    url: '',
    template: '<home></home>'
  });

  $stateProvider.state({
    name: 'newstudentorg',
    url: '/newstudentorg',
    template: '<newstudentorg></newstudentorg>'
  });

  $stateProvider.state({
    name: 'acuserconsole',
    url: '/acuserconsole',
    template: '<acuserconsole></acuserconsole>'
  });
});