// load enviroment variables
require('dotenv').config({path: './.env'});

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const { logger } = require('./util/helper');

const port = process.env.PORT;
const app = express();

app.use(cors());
const options = {
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 500,
  connectTimeoutMS: 10000,
};

let mongoUri = process.env.MONGODB_URI;
if(process.env.NODE_ENV === 'development-host'){
  // running express directly on host machine
  // reset set mongodb connection uri
  mongoUri = `mongodb://${process.env.ROOT_USERNAME}:${process.env.ROOT_PASSWORD}@localhost:${process.env.MONGO_PORT}/${process.env.DATABASE_NAME}?authSource=admin`;
}

mongoose.connect(mongoUri, options).then(() => {
  app.listen(port, () => {
    logger('Listen to port: ', port, ' Environment: ', process.env.NODE_ENV);
  });
});