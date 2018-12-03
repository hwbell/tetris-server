
var express = require('express');
var router = express.Router();

// get functions for adjusting the database
const records = require('../functions/records.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Tetris Server' });
});

router.post('/', function(req, res, next) {

  // const highScores = records.getDbScores();

  let message = {
    scores: req.body,
    message: 'Your score was inserted to the high scores! Check to see how you match up to the competition! ',
  }
  console.log('Post received');
  console.log(message);

  records.insertScore(req.body);
  res.send(message);

});

module.exports = router;

