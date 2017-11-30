const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

var ProductSchema = new Schema({
  category:{type: Schema.Types.ObjectId, ref: 'Category'},
  name: String,
  image: String,
  intro: String,
  state: String,
  address: String,
  website: String,
  fees: Number,
  phonenumber: Number,
  description: String


})



module.exports = model.Schema("Product", ProductSchema);
