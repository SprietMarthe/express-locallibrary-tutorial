/* Online website http://localhost:3000/catalog
SET DEBUG=express-locallibrary-tutorial:* & npm start
 */

// npm install express-generator -g          -g is voor globaal
// express helloworld                        to create an Express app named "helloworld" with the default settings

// cd helloworld
// npm install

// SET DEBUG=helloworld:* | npm start         want we zijn met powershell bezig
// http://127.0.0.1:3000

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var catalogRouter = require('./routes/catalog');  //Import routes for "catalog" area of site

var compression = require('compression');
var helmet = require('helmet');

var app = express();

// Set up mongoose connection
var mongoose = require('mongoose');
var dev_db_url = 'mongodb+srv://root:root@cluster0.naelr.mongodb.net/local_library?retryWrites=true&w=majority'
var mongoDB = process.env.MONGODB_URI || dev_db_url;

mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());
app.use(compression()); //Compress all routes

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/catalog', catalogRouter);  // Add catalog routes to middleware chain.


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

// // Databank
/*
keuze databanken
https://expressjs.com/en/guide/database-integration.html

npm install mongoose
mongoDB downloaden
https://www.mongodb.com/try
*/

// // Models, schemas, fields, validation, virtual properties, methods and query helpers, ...
/*
https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose#defining_and_creating_models

 // uitvoeren/ gegevens naar database schrijven
node populatedb "mongodb+srv://root:root@cluster0.naelr.mongodb.net/local_library?retryWrites=true&w=majority"

 */

// // Git
/*
git clone https://github.com/SprietMarthe/express-locallibrary-tutorial.git
cd express-locallibrary-tutorial
git add -A
git status
git commit -m "First version of application moved into GitHub"
git push origin main

als het niet werkt:
git pull --rebase
git push
 */