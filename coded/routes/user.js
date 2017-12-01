const express = require('express');
const router = express.Router();
const passport = require('passport');
var passportConfig = require('../config/passport')
var User = require('../models/user');

router.get("/login", (req, res, next)=>{
  if(req.user) return res.redirect("/")
  res.render("accounts/login", {message: req.flash('loginMessage')});
});

router.post("/login", passport.authenticate('local-login', {
  successRedirect: "/profile",
  failureRedirect: "/login",
  failureFlash: true
}))

router.get('/profile', (req, res, next)=>{
  User.findOne({_id: req.user._id}, (err, user)=>{
    if(err) return next(err)
    res.render('accounts/profile', {user: user});
  })


})

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
  user.profile.picture = user.gravatar();

  User.findOne({email: req.body.email}, function(err, existingUser){
    if(exstingUser){
      req.flash('errors', 'a user with that email alrready exist')
      return res.redirect('/signup');
    }else{
      user.save().then((newuser) =>{
        req.flass('success', 'successfully created an account');
        req.logIn(user, (err)=>{
          if(err) return next(err)
          res.redirect("/profile");
        })
      }, (e) =>{
        req.flash('errors', 'unable to create account');
        return res.rediredt('/signup');
      })

    }
  })

});
router.get("/logout", (req, res, next)=>{
  req.logout();
  res.redirect("/");
})

router.get("/edit-profile", (req, res, next)=>{
  res.render("accounts/edit-profile", {message: req.flass('success')});
})

router.post("/edit-profile", (req, res, next)=>{
  User.findOne({_id: req.user._id},(err, user)=>{
    if(req.body.firstname)user.profile.firstname = req.body.firstname;
    if(req.body.lastname) user.profile.lastname = req.body.lastname;
    if(req.body.address) user.address = req.body.address;

    user.save((err)=>{
      if(err) return next(err);
      req.flash('success', 'successfully edited your profile');
      return res.redirect('/profile');
    })
  })
})

module.exports = router;
