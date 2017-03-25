var nodemailer = require('nodemailer');

var config = require('./config');

var emailFrom = '"Alumni Request Gateway Team" <team@alumnirequestgw.com>';
var signOff = "\nBest,\nAlumni Request Gateway Team";

var transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.mailUsername,
    pass: config.mailPassword
  }
});

module.exports.sendWelcome = function(toEmail, toName) {
  var bodyText = "Welcome "+toName;
  var bodyHtml = "<b>Welcome</b> "+toName;

  transport.sendMail({
    from: emailFrom,
    to: toEmail,
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

  var bodyText = "Hello"+toStudentOrg.repName+",\nWe have received your request for your student org "+toStudentOrg.orgName+
    ". We will contact you as soon as possible with updates!"+signOff;
  var bodyHtml = "Hello<b>"+toStudentOrg.repName+"</b>,\nWe have received your request for your student org <i>"+toStudentOrg.orgName+
  "</i>. We will contact you as soon as possible with updates!"+signOff;

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

  var bodyText = "Hello"+toStudentOrg.repName+",\nAn Alumni Center employee "+acUser.name+" has begun processing your request!\n"+
    "We should have an answer for you request shortly! In the meantime you can reach out to "+acUser.name+" at "+acUser.email+signOff;
  var bodyHtml = "Hello"+toStudentOrg.repName+",\nAn Alumni Center employee "+acUser.name+" has begun processing your request!\n"+
    "We should have an answer for you request shortly! In the meantime you can reach out to "+acUser.name+" at "+acUser.email+signOff;

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

module.exports.sendRequestRejected = function (toStudentOrg, request, acUser, reason) {

  var bodyText = "Hello"+toStudentOrg.repName+",\nUnfortunately, the Alumni Center has decided to deny your Alumni Request because"+
    reason+". Our apologies plase feel free to submit requests again in the future."+signOff;
  var bodyHtml = "Hello"+toStudentOrg.repName+",\nUnfortunately, the Alumni Center has decided to deny your Alumni Request because"+
    reason+". Our apologies plase feel free to submit requests again in the future."+signOff;

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

  var bodyText = "Hello"+toStudentOrg.repName+",\nYou're in luck! An Alumni Center employee, "+acUser.name+" has fulfilled your request.\n"+
    "The alumnus, "+request.alumniName+" has agreed to attend your event."+signOff;
  var bodyHtml = "Hello"+toStudentOrg.repName+",\nYou're in luck! An Alumni Center employee, "+acUser.name+" has fulfilled your request.\n"+
    "The alumnus, "+request.alumniName+" has agreed to attend your event."+signOff;

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

  var bodyText = "Hello"+toStudentOrg.repName+",\nYou're in luck! An Alumni Center employee, "+acUser.name+
    " has approved your student organization"+toStudentOrg.orgName+" for user on the Alumni Request Gateway.\n"+signOff;
  var bodyHtml = "Hello"+toStudentOrg.repName+",\nYou're in luck! An Alumni Center employee, "+acUser.name+
    " has approved your student organization"+toStudentOrg.orgName+" for user on the Alumni Request Gateway.\n"+signOff;

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

module.exports.sendStudentOrgRejected = function (toStudentOrg, acUser, reason) {

  var bodyText = "Hello"+toStudentOrg.repName+",\nUnfortunately, your organization "+toStudentOrg.orgName+
    " has been denied access to the Alumni Request Gateway because "+reason+"."+signOff;
  var bodyHtml = "Hello"+toStudentOrg.repName+",\nUnfortunately, your organization "+toStudentOrg.orgName+
    " has been denied access to the Alumni Request Gateway because "+reason+"."+signOff;

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

