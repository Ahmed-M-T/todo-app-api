var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var UserRoute = require('./api/routes/userRoutes');
var todoList = require('./api/routes/todoListRoutes');
var app = express();
//var logger = require('morgan');

// Set up mongoose connection
var mongoose = require('mongoose');
var dev_db_url = 'mongodb://admin:admin147@ds229648.mlab.com:29648/todoappdb';
var mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB,{ useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//app.use(logger('dev'));
app.use(cors());
app.use('/user', UserRoute);
app.use('/list', todoList);
app.get('*',(req,res)=>{
    res.send("Welecome this app for test todo app!")
})


var port = 1234;

app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});