var express = require('express');
var router = express.Router();

// get functions for adjusting the database
const db = require('../functions/records.js');

let dbCollection = process.env.MONGODB_URI ? 'heroku_d19d3z3z' : 'tetris-app';

/* GET users listing. */
router.get('/', function(req, res, next) {
  
  console.log('GET request for high scores received.');
  console.log(`dbCollection: ${dbCollection}`)

  currentData = db.getScores('scores', dbCollection, (data) => {
    console.log(`Last score uploaded: ${data[data.length - 1]}`)
    res.json({data});
    
  });

});

module.exports = router;
