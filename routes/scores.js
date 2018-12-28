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
    
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.json({data});
    next();
  });

});

module.exports = router;
