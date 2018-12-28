const MongoClient = require('mongodb').MongoClient;

const localMongoUrl = 'mongodb://localhost:27017/tetris-app';
const herokuMongoUrl = process.env.MONGODB_URI;

const insertScore = (scoreObj) => {
  console.log('inserting score into mongodb');

  MongoClient.connect(herokuMongoUrl || localMongoUrl, (err, client) => {
    if (err) {
      return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    
    let dbCollection = process.env.MONGODB_URI ? 'heroku_d19d3z3z' : 'tetris-app';
    const db = client.db(dbCollection);

    console.log(`Inserting Score into collection: ${dbCollection}`)
    
    db.collection(dbCollection).insertOne({scoreObj}, (err, result) => {

      console.log(JSON.stringify(result.ops, undefined, 2));
      client.close(); 
    }, (err) => {
      console.log('Unable to insert score', err);
    });
    
  });
}

const getScores = (type, dbCollection, callback) => {

  console.log(dbCollection);

  MongoClient.connect(herokuMongoUrl || localMongoUrl, (err, client) => {
    if (err) {
      console.log('Unable to connect to MongoDb server')
    }

    const db = client.db(dbCollection);

    // don't need to use type atm, but maybe later
    db.collection(dbCollection).find().sort( { "scoreObj.score": -1 } ).toArray().then((docs) => {

      console.log(`Total: ${docs.length} records found`); 
      
      // Just return array of { name: `${name}`, score: `${score}`} objects, 
      // no mongodb ids

      let returnArray = docs.map( (record) => {
        return record.scoreObj;
      })

      client.close(); 

      return callback(returnArray);
      
    }, (err) => {
      console.log('Unable to fetch data', err);
    });

  });




}

module.exports = {
  insertScore,
  getScores
}
