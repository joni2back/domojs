var express = require('express');
var crypto = require('crypto');
var products = require('../data/products');

var router = express.Router();
var currentToken;

function validTokenProvided(req, res, next) {
    var bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        var bearer = bearerHeader.split(" ");
        if (currentToken === bearer[1]) {
            return true;
        }
    }
    res.send(401, { error: 'Invalid auth token' });
}

function buildToken(length) {
    return crypto.randomBytes(length || 32).toString('hex');
}


// middleware to prevent unauthorized users in the api
router.use('/api', function (req, res, next) {
  validTokenProvided(req, res) && next();
});

router.get('/', function(req, res, next) {
  res.render('index', { });
});






router.post('/pin/manage/:id', function(req, res) {
    var id = req.param('id');
    var active = req.body.active;

    console.info('changing status of pin: ' + id + ' to: ' + active);
    if (id && typeof active !== 'undefined') {
      valid = true;
    }

    var done = valid;
      console.info('ready board');
      // Create an Led on pin 13
      
      // Blink every half second
      active ? led13.on() : led13.off();



    res.send(!!done);
});


router.post('/auth.json', function(req, res) {

  var body = req.body,
      username = body.username,
      password = body.password;

  if (username === 'demo' && password === 'demo') {
    // Generate and save the token (forgotten upon server restart).
    currentToken = buildToken();
    res.send({
      success: true,
      token: currentToken,
      username: username
    });
  } else {
    res.send(500, {
      success: false,
      message: 'Invalid username/password'
    });
  }
});

module.exports = router;
