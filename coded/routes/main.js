const express = require('express');
const router = express.Router();
var Product = require("../models/product");

Product.createMapping((err, mapping)=>{
  if(err){
    console.log("error creating mapping");
    console.log(err)
  }else{
    console.log("Mapping created");
    console.log(mapping);
  }
});

var stream = Product.synchronize();
var count = 0;

stream.on('data', function(){
  count++;

})

stream.on('close', function(){
  console.log(`Indexd ${count} documents`);
});

stream.on('error', function(err){
  console.log(err);
})


router.get('/', function(req, res){
  res.render("main/home");
})

router.get('/about', function(req, res){
  res.render("main/about");
})


router.get('/products/:id', function(req, res, next){
  Product
    .find({ category: req.params.id })
    .populate('category')
    .exec(function(err, products){
      if(err) return next(err)
      res.render("main/category", {products: products})
    })
});

router.get("/product/:id", (req, res, next)=>{
  Product.findById({_id: req.params.id}, (err, product)=>{
    if(err) return next(err);
    res.render("main/product", {
      product: product
    })
  })
})





module.exports = router;
