import { getDb } from '../db';

const model = {};

export const getHqs = model.getHqs = () => {
  try {
    const db = getDb();
    const countries = db.collection('countries');
    return countries.find().sort({ 'Total': -1 }).limit(20).toArray();
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const randomHq = model.randomHq = async () => {
  try {
    const allHqs = await getHqs();
    const randIndex = Math.floor(Math.random() * allHqs.length);
    return allHqs[randIndex];
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const search = model.search = (keyword) => {
  try {
    const db = getDb();
    const collection = db.collection('countries');
    return collection.find({
      "Name": {
        $regex: keyword,
        $options: 'i'
      }
    }).toArray();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default model;