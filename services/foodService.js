const foodModel = require('../database/model/foodModel');
const fs = require('fs');
const path = require('path');

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
  return food.save((error, food) => {
    if (error) {
      res.status(500).json(error);
    } else {
      res.status(201).json(food);
    }
  });
}

const updateFood = (req, res) => {
  // update a food info
  foodModel.findById(req.body._id, (error, food) => {
    if (error) {
      return res.status(500).json(error);
    }
    // replace all original values with new values
    food.overwrite({ ...req.body });
    food.save((error, food) => {
      if (error) {
        return res.status(500).json(error);
      }
      return res.status(200).json(food);
    });
  }); 
}

const deleteFood = (req, res) => {
  // delete a food
  foodModel.deleteOne(req.body, (error) => {
    if (error) {
      return res.status(500).json(error);
    }
    try {
      // remove saved image file on delete
      // use path package to find the absolute path to the image file
      const imgPath = path.join(__dirname, `../assets/${req.body.image}`);
      // remove image file
      fs.unlinkSync(imgPath);
    } catch(error) {
      // just log out error on the server side, not feedback to user
      // on whether the image was removed on the server side.
      console.log(error);
    }
    res.status(204).json(req.body._id);
  });
}

module.exports = {
  getFood,
  createFood,
  updateFood,
  deleteFood,
}
