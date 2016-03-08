var requestProxy = require('express-request-proxy'),
  express = require('express'),
  port = process.env.PORT || 3000,
  app = express();

  app.use(express.static('./'));

  app.get('*', function(request, response) {
    console.log('New request:', request.url);
    response.sendFile('index.html', { root: '.' });
  });

  app.listen(port, function() {
    console.log('Server started on port ' + port + '!');
  });

// var cool = require('zgeorgii-portfolio');
// var express = require('express');
// var app = express();
//
// app.set('port', (process.env.PORT || 5000));
//
// app.use(express.static(__dirname + '/public'));
//
// // views is directory for all template files
// app.set('views', __dirname + '/views');
// app.set('view engine', 'ejs');
//
// app.get('/', function(request, response) {
//   response.render('pages/index')
// });
//
// app.get('/cool', function(request, response) {
//   response.send(cool());
// });
//
// app.listen(app.get('port'), function() {
//   console.log('Node app is running on port', app.get('port'));
// });
