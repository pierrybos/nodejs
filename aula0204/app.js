var express   =     require("express");
var bodyParser  =    require("body-parser");
var app       =     express();
var controle = false;

app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/',function(req,res){
  controle = false;
  res.sendFile(__dirname + '/index.html');
});

app.get('/:username',function(req,res){
  if(controle){
  res.send('Bem Vindo ' + req.params.username);
  res.end();
} else {
   res.sendStatus(403);
}
});


var sampleDB = [
{
  name: 'admin'
  , pwd: '123'
}
, {
  name: 'editor'
  , pwd: '123'
}
];

function wellcome(username){
  return "/" + username;
};

app.post('/login',function(req,res){
  var user_name=req.body.user;
  var password=req.body.password;

  var objVerificar = {
    name: user_name
    , pwd: password
  };

  if(sampleDB.filter(function(objTeste){
    for(var prop in objTeste){

      console.log('prop = '+ prop);
      if(objTeste[prop] != objVerificar[prop]){
        return false;
      }
      
    }
    return true;
  }).length == 1){
    controle = true;
    res.send(wellcome(user_name));


  console.log("From Client pOST request: User name = " + user_name + " and password is " + password);
  res.end("yes");

    } else {
      controle = false;
      res.sendStatus(403, {msg: 'Não Permitido'});
    
  }


});


app.listen(3000,function(){
  console.log("Started on PORT 3000");
})





/*


 var express = require('express');
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
// */