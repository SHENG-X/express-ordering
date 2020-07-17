const mongoose = require('mongoose');

const orderModel = require('../database/model/orderModel');

const getOrder = (req, res) => {
  if (Object.entries(req.query).length) {
    // if there is an order id query parameter, return the single order
    return orderModel.findById(req.query._id, (error, order) => {
      if (error) {
        return res.status(500).json(error);
      }
      return res.status(200).json(order);
    });
  }
  // return all orders
  return orderModel.find({}, (error, order) => {
    if (error) {
      return res.status(500).json(error);
    }
    return res.status(200).json(order);
  })
}

const updateOrder = (req, res) => {
  // update an order
  orderModel.findById(order._id, (error, odr) => {
    if (error) {
      return res.status(500).json(error);
    }
    odr.overwrite({ ...req.body });
    odr.save((error, order) => {
      if (error) {
        return res.status(500).json(error);
      }
      return res.status(200).json(order);
    });
  });
}

const deleteOrder = (req, res) => {
  // delete an order
  orderModel.deleteOne({ _id: req.body._id }, (error, status) => {
    if (error) {
      return res.status(500).json(error);
    }
    return res.status(204).json(req.body._id);
  });
}

const placeOrder = (req, res) => {
  // create an order
  const order = new orderModel({ ...req.body });
  order.save((error, order) => {
    if (error) {
      return res.status(500).json(error);
    }
    order.populate('items.food').execPopulate((error, order) => {
      if (error) {
        return res.status(500).json(error);
      }
      return res.status(201).json(order);
    })
  });
}

const cancelOrder = (req, res) => {
  // cancel order take an order id and set the order's
  // status to canceled
  orderModel.findById(req.body._id, (error, order) => {
    if (error) {
      return res.status(500).json(error);
    }
    // set order status to canceled
    order.overwrite({ ...order, status: 'CANCELED' });
    order.save((error, order) => {
      if (error) {
        return res.status(500).json(error);
      }
      return res.status(200).json(order);
    });
  });
}

module.exports = {
  getOrder,
  updateOrder,
  deleteOrder,
  placeOrder,
  cancelOrder,
}
