'use strict'; 

var router = require('express').Router();
var session = require('express-session');


router.use(session({
  // this mandatory configuration ensures that session IDs are not predictable
  secret: 'tongiscool' // or whatever you like
  // duration: 30000
}));



module.exports = router;
