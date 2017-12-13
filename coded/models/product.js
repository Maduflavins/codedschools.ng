const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const mongoosastic = require('mongoosastic');

var ProductSchema = new Schema({
  category:{type: Schema.Types.ObjectId, ref: 'Category'},
  name: String,
  type: String,
  image: String,
  intro: String,
  state: String,
  address: String,
  website: String,
  fees: Number,
  contactnumber: Number,
  faculty1: {
    title: String,
    subjects: []

  },
  
  faculty2: {
    title: String,
    subjects: []
  

  },
  faculty2: {
    title: String,
    subjects: []
  

  },
  faculty2: {
    title: String,
    subjects: []
  },
  
    faculty3: {
      title: String,
      subjects: []
    
  
    },
    faculty4: {
      title: String,
      subjects: []
    
  
    },
    faculty5: {
      title: String,
      subjects: []
    
  
    },
    faculty6: {
      title: String,
      subjects: []
    
  
    },
    faculty7: {
      title: String,
      subjects: []
    
  
    },

  
  faculty8: {
    title: String,
    subjects: []
  

  },

  faculty9: {
    title: String,
    subjects: []
  

  },
  faculty10: {
    title: String,
    subjects: []
  

  },

  addissionrequirements: String,
   

  paymentportal:String


});

ProductSchema.plugin(mongoosastic, {
  hosts:[
    'localhost:9300'
  ]
})



module.exports = mongoose.model("Product", ProductSchema);
