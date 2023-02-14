const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const cors=require('cors');

const UserModel = require('./model/model');

mongoose.set("strictQuery", true); 
mongoose.connect('mongodb://0.0.0.0:27017/passport-jwt',{useUnifiedTopology: true,useNewUrlParser: true,});
mongoose.connection.on('error', err => console.log(err) );
mongoose.connection.on('connected', con => console.log("con") );
mongoose.connection.on('disconnected', con => console.log("discon") );
// mongoose.Promise = global.Promise;


const routes = require('./routes/routes');
const secureRoute = require('./routes/secure-routes');
const workerProfileRoute = require('./routes/workerProfileRoutes');
const clientProfileRoute = require("./routes/clientProfileRoutes");
const clientIssueRoute = require('./routes/clientIssueRoutes')

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', routes);

// Plug in the JWT strategy as a middleware so only verified users can access this route.
app.use('/user', passport.authenticate('jwt', { session: false }), secureRoute);
app.use('/worker',workerProfileRoute);
app.use("/client", clientProfileRoute);
app.use('/clientIssue',clientIssueRoute);

// Handle errors.
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err });
});

app.listen(3000, () => {
  console.log('Server started at 3000')
});