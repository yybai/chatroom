const express = require('express')
const app = express()
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const http = require('http');
const mongoose = require('mongoose');
const session = require('express-session')
var userList =[];

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//middleware
app.use(logger('dev')); // log requests in server console
app.use(bodyParser.json()); // parse client request data to json format.     req,res
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/scripts', express.static(`${__dirname}/node_modules/`));
app.use(session({
  secret: 'webdxd',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // only set this to true if you are in HTTPS connection
}));

// user auth
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

app.use(passport.initialize());
app.use(passport.session());

// passport config
const Account = require('./models/students');
passport.use(new LocalStrategy(Account.authenticate()));
var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: "287022068466-h2g3ghm517hd7vl3i6alu0ua3tpkor58.apps.googleusercontent.com",
    clientSecret: "hPLpqwV16NMjmrQ1LyeW2DJ0",
    callbackURL: "http://localhost:3030/chat"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));











passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

//router setup
const index = require('./routes/index');
const students = require('./routes/students');
const chat = require('./routes/chat');
const user = require('./routes/user');

app.use('/', index);
app.use('/students', students);
app.use('/chat', chat);
app.use('/user', user);

// connect mongoDB
mongoose.connect('mongodb://localhost:27017/webdxd', { useMongoClient:true });
//                mongodb://webdxd:123456@ds255767.mlab.com:55767/fa-jan18
mongoose.Promise = global.Promise

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err =  new Error('Page Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next)=> {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || 3030;
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * socket.io config.
 */
const io = require('socket.io')(server);

require('./socket')(io);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, ()=>{
    console.log(`Server running on http://localhost:${port}`)
});
