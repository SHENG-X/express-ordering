// load enviroment variables
require('dotenv').config({path: './.env'});

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const { logger } = require('./util/helper');
const user = require('./router/user');
const food = require('./router/food');
const category = require('./router/category');
const picture = require('./router/picture');
const order = require('./router/order');
const payment = require('./router/payment');

const port = process.env.NODE_ENV === 'development-host' ? 
             process.env.HOST_PORT : process.env.PORT;

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// directly expose all uploaded image from 
// the assets folder
app.use('/assets', express.static('assets'));

// api end point for user management
app.use('/user', user);

// api end point for food management
app.use('/food', food);

// api end point for food category management
app.use('/category', category);

// api end point for uploading an image
app.use('/picture', picture);

// api end point for order service
app.use('/order', order);

// api end point for payment service
app.use('/pay', payment);

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