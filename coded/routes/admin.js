const router = require('express').Router();
var Category = require("../models/category");
const async = require('async')
var Product = require('../models/product');

router.get('/add-category', (req, res, next)=>{
  res.render('admin/add-category', {message: req.flash('success')});
});

router.post("/add-category", (req, res, next)=>{
  var category = new Category();
  category.name = req.body.name;

  category.save((err)=>{
    if(err) return next(err)
    req.flash('success', 'successfully added a new category')
    return res.redirect("/add-category");
  })
})


router.get("/add-product",(req, res, next)=>{
  res.render('admin/add-product');
});
    

module.exports = router;
