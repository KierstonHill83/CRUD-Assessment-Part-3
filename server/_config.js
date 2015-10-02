var config = {};

config.mongoURI = {
  development: 'mongodb://localhost/node-project',
  test: 'mongodb://localhost/node-test',
  stage: process.env.MONGOLAB_URI
};

module.exports = config;
