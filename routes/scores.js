var express = require('express');
var router = express.Router();

// get functions for adjusting the database
const db = require('../functions/records.js');

let dbCollection = process.env.MONGODB_URI ? 'heroku_ktdh1smp' : 'tetris-app';

/* GET users listing. */
router.get('/', function(req, res, next) {
  
  console.log('GET request for high scores received.');

  currentData = db.getScores('scores', dbCollection, (data) => {
    console.log(`Last score uploaded: ${data[data.length - 1]}`)
    res.send(data);
    
  });

});

module.exports = router;
