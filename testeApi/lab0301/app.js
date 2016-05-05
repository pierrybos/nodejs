/*var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
*/


var express = require("express");
var request = require('request');
var api_url = 'http://api.themoviedb.org/3/';
var token   = '246bf886104d519a1d2bf62aef1054ff';
var app     = express();

app.get('/', function(req, res){

request('http://www.google.com', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body) // Show the HTML for the Google homepage.
    res.send(body);
  }
});


});

function retornarUrlApiExterna(target){
console.log('retornarUrlApiExterna');
  console.log(target);
  
  var base = {
    top: {
      url : 'movie/top_rated?'
    },
    populares: {
      url : 'discover/movie?sort_by=popularity.desc&'
    },
    ultimos: {
      url : 'movie/latest?sort_by=popularity.desc&'
    },
    cartaz: {
      url : 'movie/now_playing?'
    },
    aguardados: {
      url : 'movie/upcoming?'
    }
 };

  return api_url + base[target].url + 'api_key=' + token;
};

app.get('/:target', function(req, res){

  if( req.params.target == 'favicon.ico' ){
    res.end('');

  } else {

  console.log(req.params);

  var caminho = req.params.target;

  console.log('caminho');
  console.log(caminho);

  var url = retornarUrlApiExterna(req.params.target);

  console.log( url );


  request(url, function(error, response, body){



    if(!error && response.statusCode == 200){
      res.send(body);
    } else {
      console.log(error);
      console.log(response.statusCode);
      res.send(body);
    }

  });

}

});

/*
app.get('/top', function(res, req){
  request(retornarUrlApiExterna('top'), function(error, response, body){

    if(!error && response.statusCode == 200){
      res.send(body);
    }

  })
});
*/

app.listen(5000, function(){
  console.log('online');
});