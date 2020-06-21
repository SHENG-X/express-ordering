// load enviroment variables
require('dotenv').config({path: './.env'});

const express = require('express');

const port = process.env.PORT;
const app = express();

app.listen(port, () => {
    console.log('Listen to port: ', port, 'Environment: ', process.env.NODE_ENV);
})