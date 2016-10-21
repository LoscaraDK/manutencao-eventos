var express = require('express'),
	app = express(),
	//log requests to the console (express4)
 	morgan = require('morgan'),             
 	// pull information from HTML POST (express4)
    bodyParser = require('body-parser'),    
    // simulate DELETE and PUT (express4)
    methodOverride = require('method-override'),
    jsonfile = require('jsonfile');
    
// set .html as the default extension 
app.set('view engine', 'html');
app.set('views',__dirname + '/views');

// Block the header from containing information
// about the server
app.disable('x-powered-by');

// Defines the port to run on
app.set('port', process.env.PORT || 3000);

//Carrega tudo que esta dentro da pasta public 
//ex: http://localhost:3000/static/img/image001.png
//ex: http://localhost:3000/img/image001.png
//app.use('/static', express.static(__dirname + '/public'));
//app.use(express.static('public'));
app.use('/manutencao-eventos', express.static(__dirname + '/public'));
app.use('/manutencao-eventos/node_modules', express.static(__dirname + '/node_modules'));
// log every request to the console
app.use(morgan('dev'));          
// parse application/x-www-form-urlencoded                               
app.use(bodyParser.urlencoded({'extended':'true'}));
// parse application/json           
app.use(bodyParser.json());          
// parse application/vnd.api+json as json                           
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Define some routes. app.get receives a path and a
// function and it defines our routes. The path isn't
// case sensitive and doesn't care about trailing path
// information.
// The req object represents the HTTP request and
// contains the query string, parameters, body, header
// The res object is the response Express sends
// when it receives a request
app.get('/manutencao-eventos', function(req, res){
  res.sendFile(__dirname + '/index.html');
  //res.render('index');
});

app.get('/manutencao-eventos/views/footer.html', function(req, res){
  res.sendFile(__dirname + '/views/footer.html');
});

app.get('/manutencao-eventos/eventos', function(req, res) {
  res.sendFile(__dirname + '/backend/eventos.json');
  
});
 
app.post('/manutencao-eventos/addEvent', function(req, res) {
  var eventos = [];
  var file = '/Desenvolvimento/workspace/manutencao-eventos/backend/eventos.json';
  
  jsonfile.readFile(file, function(err, obj) {
    eventos = obj;
    eventos.push(req.body);
    // console.log(eventos);
    jsonfile.writeFile(file, eventos, {spaces: 2}, function(err) {
      if(err){
        console.error(err);
      }
    });
  });
  res.json(true);
});

app.post('/manutencao-eventos/removeEvents', function(req, res) {
  var eventos = req.body;
  var file = '/Desenvolvimento/workspace/manutencao-eventos/backend/eventos.json';
  console.log(eventos);
  jsonfile.writeFile(file, eventos, {spaces: 2}, function(err) {
      if(err){
        console.error(err);
      }
  });

  res.json(true);
});

app.get('/manutencao-eventos/tiposDeEvento', function(req, res) {
  res.sendFile(__dirname + '/backend/tiposDeEvento.json');
  //res.json(operadoras);
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' +
    app.get('port') + '; press Ctrl-C to terminate');
});