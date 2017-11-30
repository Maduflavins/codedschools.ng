const express = require('express');
const router = express.Router();
var User = require('../models/user');

router.get('/signup', (req, res, next)=>{
  res.render('accounts/signup', {
    errors: req.flash('errors')
  });

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
      req.flash('errors', 'a user with that email alrready exist')
      return res.redirect('/signup');
    }else{
      user.save().then((newuser) =>{
        req.flass('success', 'successfully created an account');
        return res.redirect('/');
      }, (e) =>{
        req.flash('errors', 'unable to create account');
        return res.rediredt('/signup');
      })

    }
  })

});


module.exports = router;
