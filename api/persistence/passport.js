var JwtStrategy = require('passport-jwt').Strategy;

// load up the user model
var User = require('../models/userModel');
//var config = require('./userDAO'); // get db config file


module.exports = function(passport) {
  var opts = {};
  opts.secretOrKey = 'devdacticIsAwesome';  // config.secret;
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.id}, function(err, user) {
          if (err) {
              return done(err, false);
          }
          if (user) {
              done(null, user);
          } else {
              done(null, false);
          }
      });
  }));
};
