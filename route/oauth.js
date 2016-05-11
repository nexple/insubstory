module.exports = init;
function init(app) {
  var pkginfo = require('./package');
  var passport = require('passport');
  app.use(passport.initialize());
  app.use(passport.session());
  
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy