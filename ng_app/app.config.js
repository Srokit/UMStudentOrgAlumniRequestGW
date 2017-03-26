app.config(function ($stateProvider) {

  $stateProvider.state({
    name: 'root',
    url: '',
    template: '<home></home>'
  });

  $stateProvider.state({
    name: 'slash',
    url: '/',
    template: '<home></home>'
  });

  $stateProvider.state({
    name: 'newstudentorg',
    url: '/newstudentorg',
    template: '<newstudentorg></newstudentorg>'
  });

  $stateProvider.state({
    name: 'acuserconsole_sos',
    url: '/acuserconsole_sos',
    template: '<acuserconsole-sos></acuserconsole-sos>'
  });

  $stateProvider.state({
    name: 'acuserconsole_reqs',
    url: '/acuserconsole_reqs',
    template: '<acuserconsole-reqs></acuserconsole-reqs>'
  });

  $stateProvider.state({
    name: 'studentorgconsole',
    url: '/studentorgconsole',
    template: '<studentorgconsole></studentorgconsole>'
  });

  $stateProvider.state({
    name: 'submitrequest',
    url: '/submitrequest',
    template: '<submitrequest></submitrequest>'
  });

  $stateProvider.state({
    name: 'rejectrequest',
    url: '/rejectrequest/:requestId',
    template: '<rejectrequest></rejectrequest>'
  });

  $stateProvider.state({
    name: 'rejectstudentorg',
    url: '/rejectstudentorg/:studentOrgId',
    template: '<rejectstudentorg></rejectstudentorg>'
  });
});