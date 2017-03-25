var config;

if(process.env.NODE_ENV === 'production') {

  config = {
    port: process.env.PORT
  };
}

else { // process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development'

  config = {
    port: 3000
  };
}

module.exports = config;