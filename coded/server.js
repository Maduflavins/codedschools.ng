const express      =      require('express');
const morgan       =      require('morgan');
const mongoose     =      require('mongoose');
const bodyParser   =      require('body-parser');
const ejs          =      require('ejs');
const ejsmate      =      require('ejs-mate');
const session      =      require('express-session');
const cookieParser =      require('cookie-parser');
const flash        =      require('express-flash');
const LocalStrategy = require('passport-local').Strategy;
const MongoStore   =      require('connect-mongo')(session);
const passport     =      require('passport');
var secret         =      require('./config/secret');
var User           =      require('./models/user');
var Category       =      require('./models/category');
var Universities   =      require('./models/universities');




var app = express();


mongoose.Promise = global.Promise;
var promise = mongoose.connect(secret.database,{useMongoClient: true}, (err) =>{
  if(err){
    console.log(err)
  }else{
    console.log('connected to new database');
  }
})

// MiddleWare

app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: secret.secretKey,
  store: new MongoStore({url: secret.database, autoReconnect: true})
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next)=>{
  res.locals.user = req.user;
  next();
})

app.use((req, res, next)=>{
  Category.find({}, (err, categories)=>{
    if(err) return next(err)
    res.locals.categories = categories;
    next();
  })
})

app.set("view engine", "ejs");

app.engine('ejs', ejsmate);
app.use(express.static(__dirname + "/views"));
app.use(express.static(__dirname + "/public"));


var mainRoutes = require('./routes/main');
var userRoutes = require('./routes/user');
var adminRoutes = require('./routes/admin');
var apiRoutes   = require('./api/api');


app.use(mainRoutes, function(req, res, next){
  next();
})
app.use(userRoutes, function(req, res, next){
  next();
})
app.use(adminRoutes, function(req, res, next){
  next();

});
app.use('/api', apiRoutes, function(req, res, next){
  next();

  });



app.listen(secret.port, function(){
  console.log(`app is runing on port. ${secret.port}`);
})
