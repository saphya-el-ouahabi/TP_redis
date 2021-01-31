const express = require('express')
const passport = require('../passport/passport')
const app = express()
const port = 3000
//to access form data
const bodyParser = require('body-parser');
//Accessing the routes for the user
const userRoutes = require('../routes/routeUser');
const redisRoutes = require('../routes/routeData');


var mongoose = require('mongoose');


//used to fetch the data from forms on HTTP POST, and PUT
app.use(bodyParser.urlencoded({
    extended : true
  }));
  
app.use(bodyParser.json());

let session = require('express-session');

let MongoStore = require('connect-mongo')(session);
  

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})

var connStr = 'mongodb://localhost:27017/mongoose-bcrypt-test';
mongoose.connect(connStr, function (err) {
    if (err) throw err;
    console.log('Successfully connected to MongoDB');
});

//setting session
app.use(session({

  resave: true,
  saveUninitialized: true,
  secret: 'mySecretKey',
  store: new MongoStore({ url: 'mongodb://localhost:27017/mongoose-bcrypt-test', autoReconnect: true})

}));

//Acces the routes 
app.use(redisRoutes);
app.use(userRoutes);
