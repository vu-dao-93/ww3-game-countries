const fs = require('fs-extra');
const path = require('path');

module.exports = (db) => {
  const collection = db.collection('countries');
  const data = fs.readJsonSync(path.resolve(__dirname, 'static/countries.json'), 'utf8');
  collection.insertMany(data.Countries, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log('Number of countries added: ' + result.insertedCount);
  });
};