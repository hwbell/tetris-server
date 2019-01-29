const MongoClient = require('mongodb').MongoClient;

const localMongoUrl = 'mongodb://localhost:27017/tetris-app';
const herokuMongoUrl = process.env.MONGODB_URI;

// get functions for adjusting the database
const db = require('../functions/records.js');
let dbCollection = process.env.MONGODB_URI ? 'heroku_d19d3z3z' : 'tetris-app';

db.deleteScores('scores', dbCollection, (data) => {
  res.json({data});
  //res.end();
});