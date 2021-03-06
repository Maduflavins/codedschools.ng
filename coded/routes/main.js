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
});

router.post('/search', (req, res, next)=>{
  res.redirect('/search?q=' + req.body.q);
});

router.get('/search', (req, res, next)=>{
  if(req.query.q){
    Product.search({
      query_string:{query:req.query.q}
    }, (err, results)=>{
      if(err) return next(err);
      var data = results.hits.hits.map(function(hit){
        return hit
      });
      res.render('main/search-result', {
        query: req.query.q,
        data: data
      });
    })
  }
})

function paginate(req, res, next){
  var perPage = 9;
  var page = req.params.page;

  Product
    .find()
    .skip(perPage * page)
    .limit(perPage)
    .populate('category')
    .exec((err, products)=>{
      if(err) return next(err);
      res.render('/ain/product-main', {
        products: products,
        pages: count / perPage
      });
    });

}

router.get('/', function(req, res, next){
  if(req.user){
    paginate(req, res, next)
    
  }else{
    res.render("main/home");
  }
  
})
router.get('/page/:page', function(req, res, next){
  paginate(req, res, next);
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
