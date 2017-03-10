'use strict';

const rocksContent = require('./src/controllers/rocks-content.js')

const express = require('express');

const app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is the directory for all template files
app.set('views', __dirname + '/src/views');
app.set('view engine', 'ejs');

// content is the directory for all markdown files
app.set('md content path', __dirname + '/src/content');

// returns template + content from a .md file
// the page content is parsed through my rocksContent.getContent middleware
app.get('*', rocksContent.getContent, (req, res) => res.render('templates/main', { data: req.rocksContent }) ); 

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});