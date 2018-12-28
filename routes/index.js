
var express = require('express');
var router = express.Router();

// get functions for adjusting the database
const records = require('../functions/records.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.setHeader('Content-Type', 'text/html');
  res.render('index', { title: 'Tetris Server' });
  //res.end();
});

router.post('/', function(req, res, next) {

  let message = {
    scores: req.body,
    message: 'Your score was inserted to the high scores! Check to see how you match up to the competition! ',
  }
  console.log('Post received');
  console.log(message);

  records.insertScore(req.body);

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.json({message});
  //res.end();
});

module.exports = router;

