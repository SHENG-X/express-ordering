// load enviroment variables
require('dotenv').config({path:'../.env'});

db.createUser({
  user: process.env.MONGO_USERNAME,
  pwd: process.env.MONGO_PASSWORD,
  roles:[
    {
      role: 'readWhite',
      db: 'express-ordering'
    }
  ]
})