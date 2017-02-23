'use strict';

const rocksContent = require('./src/controllers/rocks-content.js')

const express = require('express');

const app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/src/views');
app.set('view engine', 'ejs');

// returns template + content from a .md file
app.get('*', (request, response) => rocksContent.get(request.path, (data) => response.render('templates/main', { data }) ) ); 

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
