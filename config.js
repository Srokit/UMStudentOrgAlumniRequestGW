var config;

if(process.env.NODE_ENV === 'production') {

  config = {
    port: process.env.PORT,
    dbUri: process.env.DB_URI,
    jwtSecret: process.env.JWT_SECRET,
    mailUsername: process.env.MAIL_USERNAME,
    mailPassword: process.env.MAIL_PASSWORD
  };
}

else { // process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development'

  config = {
    port: 3000,
    dbUri: 'mongodb://localhost:27017/umsoargw',
    jwtSecret: 'thisCantBeGuessed'
  };
}

module.exports = config;