const mongoose = require('mongoose');

var CartSchema = require('../schemas/cart.shema');
module.exports = mongoose.model('Cart', CartSchema);