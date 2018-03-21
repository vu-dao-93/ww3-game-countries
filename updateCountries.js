import 'babel-polyfill';
import fs from 'fs-extra';
import path from 'path';
import { init } from './app/db';

const startServer = async () => {
  try {
    const db = await init();
    updateCountries(db);
    return;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateCountries = (db) => {
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

startServer();