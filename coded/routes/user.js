const express = require('express');
const router = express.Router();
var User = require('../models/user');

router.get('/signup', (req, res, next)=>{
  res.render('accounts/signup');

})

router.post('/signup', (req, res, next) =>{
  var user = new User;
  user.email = req.body.email;
  user.phonenumber = req.body.phonenumber;
  user.profile.firstname = req.body.firstname;
  user.profile.lastname = req.body.lastname;
  user.profile.coded = req.body.coded;

  User.findOne({email: req.body.email}, function(err, existingUser){
    if(exstingUser){
      console.log(`${req.body.emal}. User already exist`)
      return res.redirect('/signup');
    }else{
      user.save().then((newuser) =>{
        console.log("created new user");
      }, (e) =>{
        console.log('cannot save new user');
      })

    }
  })

});


module.exports = router;
