const mongoose = require('mongoose');

const toppingsSchema = new mongoose.Schema({
  name: String,
  //pizza: [{type: mongoose.Schema.Types.ObjectId, ref: 'Pizza'}]
})


const Toppings = mongoose.model('Toppings', toppingsSchema);

module.exports = Toppings;