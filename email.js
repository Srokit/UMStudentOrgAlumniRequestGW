var nodemailer = require('nodemailer');
var fs = require('fs');

var config = require('./config');

var emailFrom = '"Alumni Request Gateway Team" <team@alumnirequestgw.com>';
var signOff = "\nBest,\nAlumni Request Gateway Team";
var url = "http://umargw.herokuapp.com/";

var transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.mailUsername,
    pass: config.mailPassword
  }
});

module.exports.sendStudentOrgWelcome = function(toStudentOrg) {

  var bodyHtml = processEmailTemplates('./email_templates/welcome_studentorg/welcome_studentorg.email.html', {
    name: toStudentOrg.repName, url: url});
  var bodyText = processEmailTemplates('./email_templates/welcome_studentorg/welcome_studentorg.email.txt', {
    name: toStudentOrg.repName, url: url});

  transport.sendMail({
    from: emailFrom,
    to: toStudentOrg.repEmail,
    subject: "Welcome to the Alumni Request Gateway",
    text: bodyText,
    html: bodyHtml
  }, function (err, info) {
    if(err) {
      console.error(err);
    }
    else {
      console.log("Got mail response:");
      console.log(info);
    }
  });
};

module.exports.sendAlumniCenterWelcome = function(toAcUser) {
  var bodyHtml = processEmailTemplates('./email_templates/welcome_acuser/welcome_acuser.email.html', {});
  var bodyText = processEmailTemplates('./email_templates/welcome_acuser/welcome_acuser.email.txt', {});

  transport.sendMail({
    from: emailFrom,
    to: toAcUser.email,
    subject: "Welcome to the Alumni Request Gateway",
    text: bodyText,
    html: bodyHtml
  }, function (err, info) {
    if(err) {
      console.error(err);
    }
    else {
      console.log("Got mail response:");
      console.log(info);
    }
  });
};

// AlumniRequest Email Notifs

module.exports.sendRequestReceived = function (toStudentOrg, request) {

  var bodyHtml = processEmailTemplates('./email_templates/alumni_request_actions/received/alumni_request_action_received.email.html', {});
  var bodyText = processEmailTemplates('./email_templates/alumni_request_actions/received/alumni_request_action_received.email.txt', {});

  transport.sendMail({
    from: emailFrom,
    to: toStudentOrg.repEmail,
    subject: "Your Alumni Request was received!",
    text: bodyText,
    html: bodyHtml
  }, function (err, info) {
    if(err) {
      console.error(err);
    }
    else {
      console.log("Got mail response:");
      console.log(info);
    }
  });
};

module.exports.sendRequestHandled = function (toStudentOrg, request, acUser) {

  var bodyHtml = processEmailTemplates('./email_templates/alumni_request_actions/handle/alumni_request_action_handle.email.html', {});
  var bodyText = processEmailTemplates('./email_templates/alumni_request_actions/handle/alumni_request_action_handle.email.txt', {});

  transport.sendMail({
    from: emailFrom,
    to: toStudentOrg.repEmail,
    subject: "Your Alumni Request is being processed!",
    text: bodyText,
    html: bodyHtml
  }, function (err, info) {
    if(err) {
      console.error(err);
    }
    else {
      console.log("Got mail response:");
      console.log(info);
    }
  });
};

module.exports.sendRequestRejected = function (toStudentOrg, request, reason) {

  var bodyHtml = processEmailTemplates('./email_templates/alumni_request_actions/reject/alumni_request_action_reject.email.html', {});
  var bodyText = processEmailTemplates('./email_templates/alumni_request_actions/reject/alumni_request_action_reject.email.txt', {});

  transport.sendMail({
    from: emailFrom,
    to: toStudentOrg.repEmail,
    subject: "Your Alumni Request has been rejected D:",
    text: bodyText,
    html: bodyHtml
  }, function (err, info) {
    if(err) {
      console.error(err);
    }
    else {
      console.log("Got mail response:");
      console.log(info);
    }
  });

};

module.exports.sendRequestFulfilled = function (toStudentOrg, request, acUser) {

  var bodyHtml = processEmailTemplates('./email_templates/alumni_request_actions/fulfill/alumni_request_action_fulfill.email.html', {});
  var bodyText = processEmailTemplates('./email_templates/alumni_request_actions/fulfill/alumni_request_action_fulfill.email.txt', {});

  transport.sendMail({
    from: emailFrom,
    to: toStudentOrg.repEmail,
    subject: "Your Alumni Request has been fulfilled (Hazaah!)",
    text: bodyText,
    html: bodyHtml
  }, function (err, info) {
    if(err) {
      console.error(err);
    }
    else {
      console.log("Got mail response:");
      console.log(info);
    }
  });
};


// Student org approval system notifications

module.exports.sendStudentOrgApproved = function (toStudentOrg, acUser) {

  var bodyHtml = processEmailTemplates('./email_templates/studentorg_request_actions/accept/studentorg_request_action_accept.email.html', {});
  var bodyText = processEmailTemplates('./email_templates/studentorg_request_actions/accept/studentorg_request_action_accept.email.txt', {});

  transport.sendMail({
    from: emailFrom,
    to: toStudentOrg.repEmail,
    subject: "Your Student Organization has been approved!",
    text: bodyText,
    html: bodyHtml
  }, function (err, info) {
    if(err) {
      console.error(err);
    }
    else {
      console.log("Got mail response:");
      console.log(info);
    }
  });

};

module.exports.sendStudentOrgRejected = function (toStudentOrg, reason) {

  var bodyHtml = processEmailTemplates('./email_templates/studentorg_request_actions/reject/studentorg_request_action_reject.email.html', {});
  var bodyText = processEmailTemplates('./email_templates/studentorg_request_actions/reject/studentorg_request_action_reject.email.txt', {});

  transport.sendMail({
    from: emailFrom,
    to: toStudentOrg.repEmail,
    subject: "Your Student Organization has been denied from the Alumni Request Gateway D:",
    text: bodyText,
    html: bodyHtml
  }, function (err, info) {
    if(err) {
      console.error(err);
    }
    else {
      console.log("Got mail response:");
      console.log(info);
    }
  });
};

// Processes email body templates and gives the final raw text to be passed to nodemailer without {{}} markers
// Arguments: (injectables) = object whose properties are injected into the templates where {{property}} exist
function processEmailTemplates(filename, injectables) {

  var text = fs.readFileSync(filename).toString();

  for(var prop in injectables) {
    if(injectables.hasOwnProperty(prop)) {
      text = text.replace('{{' + prop + '}}', injectables[prop]);
      console.log("Replacing", prop, "result", text);
    }
  }

  return text;
}
