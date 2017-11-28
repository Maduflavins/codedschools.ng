const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  email:{type: String, unique: true, lowercase: true},
  password: String,
  phonenumber : Number,
  profile:{
    firstname:{type: String, default:''},
    lastname:{type:String, default:''},
    picture:{type: String, default:''},
    coded:String
  },
  address: String,
  history: [{
    date: Date,
    paid:{type: Number, default: 0}
  }]

})

// Hash password
UserSchema.pre('save', function(next){
  var user = this
  if(!use.isModified('password')) return next()
  bcrypt.genSalt(10, function(err, salt){
    if(err) return next(err)
    bcrypt.hash(user.password, salt, null, function(err, hash){
      if(err) return next(err)
      user.password = hash;
      next();
    })
  })

})

//Compare password
UserSchema.methods.comparePassword = function(password){
  return bcrypt.compareSync(password, this.password)
}



module.exports = mongoose.model("User", UserSchema);
