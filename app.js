const express = require('express');
// const session  = require('express-session');
// const connect = require('connect');
const path = require('path');
const app = express();

require('dotenv').config();

// const flash = require('connect-flash');
// app.use(flash());

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// view engine setup
app.set('views', path.join(__dirname, 'app/view'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

// app.use(session({
//     secret: 'vidyapathaisalwaysrunning',
//     resave: true,
//     saveUninitialized: true,
//     cookie: { maxAge: 1000 * 60 * 30 },
//     rolling: true
// }));

// const passport = require('./config/passport');
// app.use(passport.initialize());
// app.use(passport.session());

app.use('/', require('./app/routes/index'));

module.exports = app;