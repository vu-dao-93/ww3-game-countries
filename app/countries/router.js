import express from 'express';
import countries from './model';
const router = express.Router();

router.get('/', async (req, res) => {
  const params = req.query;
  console.log(params);
  try {
    let { ipp, pg, sort } = params;
    ipp = +ipp;
    pg = +pg;
    let query = {};
    Object.keys(params).forEach(key => {
      if (['ipp', 'pg', 'sort'].indexOf(key) > -1) {
        return;
      }
      const tableKey = key.charAt(0).toUpperCase() + key.substr(1);
      query[tableKey] = params[key];
    });
    const results = await countries.get({
      query,
      sort,
      ipp,
      pg
    });
    console.log(results);
    res.json(results);
  } catch (error) {
    console.log(error);
    res.status(error.status).send(error.message);
  }
});

router.get('/search', async (req, res) => {
  const params = req.query;
  let { keyword, field, sort, ipp, pg } = params;
  keyword = keyword.split(',');
  field = field.split(',');
  ipp = +ipp;
  pg = +pg;
  let query = {};
  field.forEach((element, index) => {
    query[element] = {
      $regex: keyword[index],
      $options: 'i'
    };
  });
  try {
    res.json(await countries.search({
      query,
      sort,
      ipp,
      pg
    }));
  } catch (error) {
    console.log(error);
    res.status(error.status).send(error.message);
  }
});

export default router;