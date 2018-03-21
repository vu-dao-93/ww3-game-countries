import express from 'express';
import countries from './model';
const router = express.Router();

router.get('/', async (req, res) => {
  const query = req.query;
  try {
    if (query.q) {
      res.send(await countries.search(query.q));
    }
  } catch (error) {
    console.log(error);
    res.status(error.status).send(error.message);
  }
});

router.get('/hqs', async (req, res) => {
  try {
    const hqs = await countries.getHqs();
    res.json(hqs);
  } catch (error) {
    console.log(error);
    res.status(error.status).send(error.message);
  }
});

router.get('/hqs/r', async (req, res) => {
  try {
    const results = await countries.randomHq();
    res.json(results);
  } catch (error) {
    console.log(error);
    res.status(error.status).send(error.message);
  }
});

export default router;