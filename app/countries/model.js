import { getDb } from '../db';

const model = {};

export const get = model.get = (options) => {
  const { query, sort, ipp, pg } = options;

  let aggrPipeline = [{ $match: query }];
  if (!sort) {
    aggrPipeline.push({ $sample: { size: ipp } });
  }
  console.log(aggrPipeline);

  try {
    const db = getDb();
    return db.collection('countries').aggregate(aggrPipeline).toArray();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const search = model.search = (options) => {
  const { query, sort, ipp, pg } = options;
  try {
    const db = getDb();
    const collection = db.collection('countries');
    return collection.find(query).toArray();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default model;