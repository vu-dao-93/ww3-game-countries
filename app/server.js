import express from 'express';
import bodyParser from 'body-parser';
import config from './config';
import router from './countries/router';
import { init } from './db';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Headers', 'Origin, Content-Type');

  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
    return;
  }
  next();
});

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.use(router);

const startServer = async () => {
  try {
    await init();
    app.listen(config.express.port, config.express.ip);
    return;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

startServer();
