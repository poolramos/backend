const mongoose = require("mongoose");

const productosCollection = "productos";

const productoSchema = new mongoose.Schema({
    name: {
      type: String,
      require: true,
      max: 100,
    },
    description: {
      type: String,
      require: true,
      max: 100,
    },
    code: {
      type: Number,
      require: true,
    },
    thumbnail: {
      type: String,
      require: true,
      max: 100,
    },
    price: {
      type: String,
      require: true
    },
    stock: {
      type: Number,
      require: true,
    },
  });

module.exports = {
    productos: mongoose.model(productosCollection, productoSchema)
};