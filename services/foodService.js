const foodModel = require('../database/model/foodModel');

const getFood = (req, res) => {
  // get a food detail by id
  if (Object.entries(req.query).length) {
    return foodModel.findById(req.query._id, (error, food) => {
      if (error) {
        res.status(500).json(error);
      } else {
        res.status(200).json(food);
      }
    });
  } else {
    return foodModel.find({}, (error, food) => {
      if (error) {
        res.status(500).json(error);
      } else {
        res.status(200).json(food);
      }
    });
  }
}

const createFood = (req, res) => {
  // create a new food
  const food = new foodModel({...req.body});
  return food.save((error, doc) => {
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