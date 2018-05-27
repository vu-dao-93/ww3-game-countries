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

const updateCountries = async (db) => {
  const collection = db.collection('countries');
  const data = fs.readJsonSync(path.resolve(__dirname, 'static/countries.json'), 'utf8');
  try {
    await collection.remove({});
  } catch (error) {
    console.log(error);
    throw error;
  }

  try {
    const { insertedCount } = await collection.insertMany(data.Countries);
    console.log('Number of countries added: ' + insertedCount);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

startServer();