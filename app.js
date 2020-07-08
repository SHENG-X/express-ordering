// load enviroment variables
require('dotenv').config({path: './.env'});

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const { logger } = require('./util/helper');
const user = require('./router/user');

const port = process.env.NODE_ENV === 'development-host' ? 
             process.env.HOST_PORT : process.env.PORT;

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/user', user);

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