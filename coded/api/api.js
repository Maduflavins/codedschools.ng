const router = require('express').Router();
var Category = require('../models/category');
var Product = require('../models/product');
const async = require('async');



router.get('/:name', function(req, res, next){

    async.waterfall([
        function(callback){
            Category.findOne({ name:req.params.name}, function(err, category){
            if(err) return next(err);
            callback(null, category);
        })

        }, function(category, callback){
            var product = new Product();
            product.category = category._id;
            product.name  = "Federal University of Technology, Akure";
            product.type = "federal university";
            product.state = "Adamawa State";
            product.image ="https://cdn.myschoolgist.com/wp-content/uploads/2013/12/FUTA.jpg";
            product.intro     = "aMaking Nigeria a Technology Hub.";
            product.address = "Ondo State";
            product.website   = "http://www.futa.edu.ng";
            product.faculty1.title = "School of Agriculture and Agricultural Technology";
            product.faculty1.subjects = [
                                            "Agricultural Extension & Communication Technology",
                                            "Agricultural & Resource Economics",
                                            "Animal Production & Health",
                                            "Crop, Soil & Pest Management",
                                            "Fisheries & Aquaculture Technology",
                                            "Ecotourism & Wildlife Management",
                                            "Forestry & Wood Technology",
                                            "Food Science & Technology"
                                        ];
                
            
            product.faculty2.title = "School of Engineering & Engineering Technology";
            product.faculty2.subjects = [
                                            "Agricultural Engineering",
                                        	"Civil Engineering",
                                        	"Electrical & Electronics Engineering",
                                        	"Mechanical Engineering",
                                        	"Metallurgical & Materials Engineering",
                                        	"Mining Engineering"
                                        ];
               
            product.faculty3.title = "School of Earth & Mineral Sciences";
            product.faculty3.subjects = [
                                            "Applied Geophysics",
                                        	"Applied Geology",
                                        	"Metereology",
                                        	"Marine Science & Technology",
                                        	"Remote Sensing & Geo-science Information Systems"

                                        ];
                
             product.faculty4.title = "School of Environmental Technology";
             product.faculty4.subjects = [
                                            "Architecture",
                                        	"Building Technology",
                                        	"Estate Management",
                                        	"Industrial Design",
                                        	"Quantity Surveying",
                                        	"Urban & Regional Planning",
                                        	"Surveying and Geoinformatics"

                                        ];
                
            product.faculty5.title = "School of Management Technology";
            product.faculty5.subjects = [
                                                "Project Management Technology",
                                            	"Transport Management Technology",
                                            	"Library Management Technology",
                                            	"Entrepreneurship Management Technology"
                                            
                                        ];
            product.faculty6.title = "School of Sciences";
            product.faculty6.subjects = [
                                            "Biochemistry",
                                            "Biology",
                                            "Chemistry",
                                            "Computer Science",
                                            "General Studies",
                                            "Mathematical Sciences",
                                            "Microbiology",
                                            "Physics and Statistics"

                                        ];
        
            product.paymentportal = "we make use of bank";
            product.save();

        }
    ]);
    res.json({message:'Success'});

})


module.exports = router;
