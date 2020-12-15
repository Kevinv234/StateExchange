const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fileUpload = require('express-fileupload')
const passport = require('passport');

require('./auth/passport');

const app = express();

//routes import
const fileRouter = require('./routes/files');
const search_query = require('./routes/search_query');
const newPostRouter = require('./routes/insertPost');
const category_query = require('./routes/categories');
const usersRouter = require('./routes/users');
const messagingRouter = require('./routes/messaging');
const messagesIndexRouter = require('./routes/messaging-index');
const deletePostRouter = require('./routes/delete_post');
const auth = require('./routes/auth');
const postRouter = require('./routes/post');
const dashboardGatewayRouter = require('./routes/dashboardGateway')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

var allowCrossDomain = function(req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    const auth = require('./routes/auth');
    app.use('/auth', auth);

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
}

//middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/contact/edit/:id/:id',express.static(path.join(__dirname, 'public')));
app.use(allowCrossDomain);
app.use(fileUpload({ createParentPath: true}));

//routes for the files
app.use('/users', usersRouter); //passport.authenticate('jwt', {session: false}),
app.use('/post', postRouter); 

//routes setup
app.use('/', fileRouter);
app.use('/', search_query);
app.use('/', newPostRouter);
app.use('/', category_query);
app.use('/', deletePostRouter);
app.use('/users', usersRouter); //passport.authenticate('jwt', {session: false}),
app.use('/messaging', passport.authenticate('jwt', {session: false}), messagingRouter); //passport.authenticate('jwt', {session: false}),
app.use('/messaging-index', passport.authenticate('jwt', {session: false}), messagesIndexRouter);
app.use('/auth', auth);
app.use('/', dashboardGatewayRouter);
app.use(passport.initialize());   // passport initialize middleware
app.use(passport.session());      // passport session middleware 

app.use('/test', function(req, res){
  // How can I get the user's login info here?
  if (req.headers && req.headers.authorization) {
    var authorization = headers.authorization,
        decoded;
    try {
        decoded = jwt.verify(authorization, secret.secretToken);
    } catch (e) {
        return res.status(401).send('unauthorized');
    }
    var userId = decoded.id;
    // Fetch the user by id 
    User.findOne({_id: userId}).then(function(user){
        // Do something with the user
        console.log(req.id);
        return res.send(200);
    });
    return res.json();
}

});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.log(err)

  // render the error page
  res.status(err.status || 500);
  res.sendFile(path.join(__dirname, 'views/error.html'));
});


module.exports = app;