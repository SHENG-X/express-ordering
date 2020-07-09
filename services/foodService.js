const foodModel = require('../database/model/foodModel');

const getFood = (req, res) => {
  // get a food detail by id
}

const createFood = async (req, res) => {
  // create a new food
  const food = new foodModel({...req.body});
  await food.save((error, doc) => {
    if (error) {
      res.status(500).json(error);
    } else {
      res.send(201).json(food);
    }
  });
}

const updateFood = (req, res) => {
  // update a food info
}

const deleteFood = (req, res) => {
  // delete a food
}

module.exports = {
  getFood,
  createFood,
  updateFood,
  deleteFood,
}