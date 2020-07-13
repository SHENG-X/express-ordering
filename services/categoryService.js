const categoryModel = require('../database/model/categoryModel');

const getCategory = (req, res) => {
  // get a category detail by id
  if (Object.entries(req.query).length) {
    return categoryModel.findById(req.query._id, (error, category) => {
      if (error) {
        res.status(500).json(error);
      } else {
        res.status(200).json(category);
      }
    });
  } else {
    return categoryModel.find({}, (error, category) => {
      if (error) {
        res.status(500).json(error);
      } else {
        res.status(200).json(category);
      }
    });
  }
}

const createCategory = (req, res) => {
  // create a new food category
  const category = new categoryModel({ ...req.body });
  return category.save((error, category) => {
    if (error) {
      return res.status(500).json(error);
    }
    return res.status(201).json(category);
  });
}

const updateCategory = (req, res) => {
  // update a food category
  categoryModel.findById(req.body._id, (error, category) => {
    if (error) {
      return res.status(500).json(error);
    }
    // replace all original values with new values
    category.overwrite({ ...req.body });
    category.save((error, category) => {
      if (error) {
        return res.status(500).json(error);
      }
      return res.status(200).json(category);
    });
  }); 
}

const deleteCategory = (req, res) => {
  // delete a category
  categoryModel.deleteOne(req.body, (error) => {
    if (error) {
      return res.status(500).json(error);
    }
    res.status(404).json(req.body._id);
  });
}

module.exports = {
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
}
