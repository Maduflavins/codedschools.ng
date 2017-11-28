const express      =      require('express');
const morgan       =      require('morgan');
const mongoose     =      require('mongoose');
const bodyParser   =      require('body-parser');
const ejs          =      require('ejs');
const ejsmate      =      require('ejs-mate');
var User           =      require('./models/user');
var Universities   =      require('./models/universities');



var app = express();


mongoose.Promise = global.Promise;
var promise = mongoose.connect('mongodb://codedschool:codedschool@ds121336.mlab.com:21336/codedschools_ng_database' ,{useMongoClient: true}, (err) =>{
  if(err){
    console.log(err)
  }else{
    console.log('connected to new database');
  }
})

// MiddleWare

app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine", "ejs");

app.engine('ejs', ejsmate);
app.use(express.static(__dirname + "/views"));
app.use(express.static(__dirname + "/public"));


var mainRoutes = require('./routes/main');
var userRoutes = require('./routes/user')
app.use(mainRoutes);
app.use(userRoutes);




app.listen(3000, function(){
  console.log("app is runing on port 3000");
})
