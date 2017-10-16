var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

//Routes for todo api
var index = require('./routes/index');
var todos = require('./routes/todos');

var app = express();

// View Engine
app.set('views', path.join(__dirname, 'views')); // views folder for template for views
app.set('view engine', 'ejs'); // set view engine to ejs
app.engine('html', require('ejs').renderFile);


app.use(express.static(path.join(__dirname, 'client')));
//add middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//routes
app.use('/', index);
app.use('/api/v1/', todos);

//setup listen to run the server
app.listen(3000, function(){
    console.log('Server started on port 3000...');
});
