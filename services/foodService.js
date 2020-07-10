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
      res.status(201).json(food);
    }
  });
}

const updateFood = (req, res) => {
  // update a food info
}

const deleteFood = (req, res) => {
  // delete a food
  foodModel.deleteOne(req.body, (error) => {
    if (error) {
      return res.status(500).json(error);
    }
    res.status(404).json(req.body._id);
  })
}

module.exports = {
  getFood,
  createFood,
  updateFood,
  deleteFood,
}
