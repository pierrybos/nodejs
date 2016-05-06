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
var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var api_url = 'http://api.themoviedb.org/3/';
var token   = '246bf886104d519a1d2bf62aef1054ff';
var app     = express();


mongoose.connect('mongodb://localhost:27017/meusfilmes');


var Film = mongoose.model('Film', {
  capa: String
  , titulo : String
  , desc : String
});

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


// http://api.themoviedb.org/3/movie/id

  return api_url + base[target].url + 'api_key=' + token;
};

app.get('/favicon.ico', function(req, res){

    res.end('');

});



app.get('/filme/:idFilme', function(req, res){

  var url = api_url + 'movie/' + req.params.idFilme + '?api_key=' + token;

  request(url, function(error, response, body){


    if(!error && response.statusCode == 200){
      res.send(body);
    } else {
      
      res.send(body);
    }

  });


});




app.get('/salvar-filme/:idFilme', function(req, res){

  var url = api_url + 'movie/' + req.params.idFilme + '?api_key=' + token;

  request(url, function(error, response, body){



    if(!error && response.statusCode == 200){

/*      MongoClient.connect('mongodb://localhost:27017/imdb', function(err, db){

        if(!err){
          var objFilme = JSON.parse( response.body.replace("'", "\'") ); 
          // JSON.parse('{"adult":false,"backdrop_path":null,"belongs_to_collection":null,"budget":0,"genres":[{"id":18,"name":"Drama"}],"homepage":"","id":244790,"imdb_id":"tt0167893","original_language":"en","original_title":"Il dialogo di Roma","overview":"\'The subject of this film is the conversation between a man and a woman. A couple, maybe lovers, maybe married, it doesn\'t matter. (...) During this conversation, we do not see but the city of Rome. I wanted to transmit that what Rome provokes in me, the feeling of an intrinsic matter, indissoluble, in difference with Paris, made of small parks and open spaces, crossed by the sky and the wind. Hand in hand with the film, the difficulty of the two lovers assumes a clearer, more explicit form. But as much as, in my opinion, it is impossible to describe and film Rome, the difficulty in the love of a couple can never be totally understood.\' - Marguerite Duras, Venice film festival catalogue, 1982.","popularity":0.0,"poster_path":"/7tDJPLOujjoYNemiwnoa2Xkjhhl.jpg","production_companies":[],"production_countries":[],"release_date":"1983-02-23","revenue":0,"runtime":61,"spoken_languages":[{"iso_639_1":"it","name":"Italiano"}],"status":"Released","tagline":"","title":"Il dialogo di Roma","video":false,"vote_average":0.0,"vote_count":0}');
          db.collection('filmes').insert(esseFilme,  function(err, result) {
            //assert.equal(err, null);
            console.log("Inserted a document into the restaurants collection.");
            res.send('Armazenado');
          });
        } else {
          res.send(err);
        }
      });
*/
var objFilme = JSON.parse( response.body.replace("'", "\'") ); 

console.log(objFilme.original_title);
console.log(objFilme.overview);
console.log(objFilme.poster_path);

    var esseFilme = new Film({
      titulo: objFilme.original_title
      , desc: objFilme.overview
      , capa: objFilme.poster_path
    });

    esseFilme.save(function(err){
      if(err){
        res.send(err);
      } else {
        res.send('gravado');
      }
    });


    } else {
      
      res.send(body);
    }

  });


});



app.get('/:target', function(req, res){

  if( false ){
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

app.listen(4000, function(){
  console.log('online');
});