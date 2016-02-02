var app = require('express')();
var http = require('http').Server(app);
var port = 8080;
var express = require('express');
var path = require('path');

//app.use(express.static(path.join(__dirname, 'chat_app')));
//setting up our port
http.listen(port, function() {
console.log('Server is listening on port... ' + port);
});

//routing to our index.html
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});


app.get('/popularposts', function(req, res) {
   res.sendFile(__dirname + '/index.html'); 
});


app.get('/search', function(req, res) {
   res.sendFile(__dirname + '/index.html'); 
});


app.get('/createposts', function(req, res) {
   res.sendFile(__dirname + '/index.html'); 
});


app.get('/login', function(req, res) {
   res.sendFile(__dirname + '/index.html'); 
});


app.get('/popularposts', function(req, res) {
   res.sendFile(__dirname + '/index.html'); 
});

app.get('/comedy', function(req, res) {
   res.sendFile(__dirname + '/index.html'); 
});


app.get('/educational', function(req, res) {
   res.sendFile(__dirname + '/index.html'); 
});

app.get('/games', function(req, res) {
   res.sendFile(__dirname + '/index.html'); 
});

app.get('/politics', function(req, res) {
   res.sendFile(__dirname + '/index.html'); 
});

app.get('/literatureart', function(req, res) {
   res.sendFile(__dirname + '/index.html'); 
});
app.use(express.static(__dirname +'/'));