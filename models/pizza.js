const mongoose = require('mongoose');

const pizzaSchema = new mongoose.Schema({
  name: String,
  price: Number,
  size: String,
  delivery: Boolean,
  toppings: [{type: mongoose.Schema.Types.ObjectId, ref: 'Toppings'}]
})


const Pizza = mongoose.model('Pizza', pizzaSchema);

module.exports = Pizza;