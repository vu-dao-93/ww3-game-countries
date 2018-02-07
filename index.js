const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;

// Connection URL
const URL = 'mongodb://admin:balm-G4-Mu01@ds159845.mlab.com:59845/ww3-game';

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: true
}));

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Headers', 'Origin, Content-Type');

  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
    return;
  }
  next();
});

MongoClient.connect(URL, (err, db) => {
  if (err) {
    console.log('Error connecting to db');
    console.log(err);
    return;
  }
  console.log('Connected to db');

  router.get('/hqs', (req, res) => {
    const collection = db.collection('countries');
    collection.find().sort({ 'Total': -1 }).limit(20).toArray((err, result) => {
      if (err) {
        console.log(err);
        res.status(err.status).send(err.message);
        return;
      }
      res.send(result);
    });
  });

});

app.use(router);

app.listen(8000, () => {
  console.log('Listening to app at port ' + 8000);
});