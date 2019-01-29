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

    db.collection(dbCollection).insertOne({ scoreObj }, (err, result) => {

      console.log(JSON.stringify(result.ops, undefined, 2));
      client.close();
    }, (err) => {
      console.log('Unable to insert score', err);
    });

  });
}

const deleteScores = () => {

  MongoClient.connect(herokuMongoUrl || localMongoUrl, (err, client) => {
    if (err) {
      console.log('Unable to connect to MongoDb server')
    }
    console.log('Connected to MongoDB server');

    let dbCollection = process.env.MONGODB_URI ? 'heroku_d19d3z3z' : 'tetris-app';
    const db = client.db(dbCollection);

    console.log(`Inserting Score into collection: ${dbCollection}`)

    // deleteMany
    db.collection(dbCollection).deleteMany().then((result) => {
      console.log(result);
    });

    // //  deleteOne
    // db.collection('Users').deleteOne({
    //   _id: new ObjectID('5b507a7fa4f4e77ae0e0b1dc')
    // }).then((result) => {
    //   console.log(JSON.stringify(result, undefined, 2));
    // });

    // findOneAndDelete
    //  db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
    //   console.log(result);
    //  });

    client.close(); // different from video for V3
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
    db.collection(dbCollection).find().sort({ "scoreObj.score": -1 }).toArray().then((docs) => {

      console.log(`Total: ${docs.length} records found`);

      // Just return array of { name: `${name}`, score: `${score}`} objects, 
      // no mongodb ids

      let returnArray = docs.map((record) => {
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
  getScores,
  deleteScores
}
