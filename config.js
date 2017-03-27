var config;

if(process.env.NODE_ENV === 'production') {

  config = {
    port: process.env.PORT,
    dbUri: process.env.MONGODB_URI,
    jwtSecret: process.env.JWT_SECRET,
    mailUsername: process.env.MAIL_USERNAME,
    mailPassword: process.env.MAIL_PASSWORD,
    adminPass: process.env.ADMIN_PASS
  };
}

else { // process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development'

  config = {
    port: 3000,
    dbUri: 'mongodb://localhost:27017/umsoargw',
    jwtSecret: 'thisCantBeGuessed',
    mailUsername: 'srok35@gmail.com',
    mailPassword: '42!Hayoob',
    adminPass: 'adminPass'
  };
}

module.exports = config;