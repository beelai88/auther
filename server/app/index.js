'use strict'; 

var app = require('express')();
var path = require('path');
var User = require('../api/users/user.model');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var session = require('express-session');

app.use(require('./logging.middleware'));

app.use(require('./express-session.middleware'));

app.use(function (req, res, next) {
  console.log('session', req.session);
  next();
});

app.use(passport.initialize());

app.use(passport.session());


app.use(require('./request-state.middleware'));

app.use(require('./statics.middleware'));

app.use('/api', require('../api/api.router'));


// LOGIN AND LOGOUT ROUTES
app.post('/login', function (req, res, next) {
  User.findOne({
    where: req.body
  })
  .then(function (user) {
    if (!user) {
      res.sendStatus(401);
    } else {
      req.login(user, function(err) {
        if (err) { 
          return next(err); 
        }
        // req.session.userId = user.id;
        res.json(user);
        res.sendStatus(204);
      });
    }
  })
  .catch(next);
});

app.post('/logout', function(req, res, next){
  req.logout();
  // req.session.userId = null;
  res.end();
});

passport.use(
  new GoogleStrategy({
    clientID: '1078233064102-k42qc7asj8r72p8f73qc7uqhhgj4rvlu.apps.googleusercontent.com',
    clientSecret: 'dQCFYhzeV5fHF9XSOpAQa5JI',
    callbackURL: 'http://localhost:8080/auth/google/callback'
  },
  // Google will send back the token and profile
  function (token, refreshToken, profile, done) {
    // the callback will pass back user profile information and each service (Facebook, Twitter, and Google) will pass it back a different way. Passport standardizes the information that comes back in its profile object.
    var info = {
      name: profile.displayName,
      email: profile.emails[0].value,
      photo: profile.photos ? profile.photos[0].value : undefined
    };
    User.findOrCreate({
      where: {googleId: profile.id},
      defaults: info
    })
    .then(function (results) { //or .spread(function(user))
      var user = results[0]
      console.log('HERE IS USER', user);
      done(null, user);
    })
    .catch(done);

  })
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id)
  .then(function (user) {
    done(null, user);
  })
  .catch(function (err) {
    done(err);
  });
});

// Google authentication and login 
app.get('/auth/google', passport.authenticate('google', { scope : 'email' }));

// handle the callback after Google has authenticated the user
app.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect : '/stories', // or wherever
    failureRedirect : '/login' // or wherever
  })
);

var validFrontendRoutes = ['/', '/stories', '/users', '/stories/:id', '/users/:id', '/signup', '/login'];
var indexPath = path.join(__dirname, '..', '..', 'public', 'index.html');
validFrontendRoutes.forEach(function (stateRoute) {
  app.get(stateRoute, function (req, res) {
    res.sendFile(indexPath);
  });
});

app.use(require('./error.middleware'));

module.exports = app;
