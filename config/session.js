module.exports.session = {

  // Session secret is automatically generated when your new app is created
  // Replace at your own risk in production-- you will invalidate the cookies of your users,
  // forcing them to log in again. 
  secret: 'd494d185735d00432bc3485d32bd5ca8',


  // In production, uncomment the following lines to set up a shared redis session store
  // that can be shared across multiple Sails.js servers

  // HOSTED REDIS INSTANCE
  // adapter: 'redis',

  // host: process.env.REDIS_HOST,
  // port: process.env.REDIS_PORT,
  // // ttl: <redis session TTL in seconds>,
  // db: process.env.REDIS_DB,
  // pass: process.env.REDIS_PASS
  // prefix: 'sess:'

  // // USE IN MEMORY
  //   adapter: 'memory'

  // Uncomment the following lines to use your Mongo adapter as a session store
  // adapter: 'mongo',
  //
  // host: 'localhost',
  // port: 27017,
  // db: 'sails',
  // collection: 'sessions',
  //
  // Optional Values:
  //
  // # Note: url will override other connection settings
  // url: 'mongodb://user:pass@host:port/database/collection',
  //
  // username: '',
  // password: '',
  // auto_reconnect: false,
  // ssl: false,
  // stringify: true

};