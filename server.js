const express = require('express');

const path = require('path');
const app = express();
const http = require("http");

require('dotenv').config();

// const cors = require('cors');

app.set('views', path.join(__dirname, 'app/view'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const flash = require('connect-flash');
app.use(flash());

const server = http.createServer(app);

const socketio = require('socket.io');
const io = socketio(server);
// app.set('socketio', io);

const match = require('./app/socket/match');
match.connection(io);

const session = require('express-session');
app.use(session({
  secret: 'vidyapathaisalwaysrunning',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60 * 30 },
  rolling: true
}));

const passport = require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./app/routes/index'));

app.use(function (req, res, next) {
  res.status(404);

  res.format({
    html: function () {
      res.render('404', { url: req.url })
    },
    json: function () {
      res.json({ error: 'Not found' })
    },
    default: function () {
      res.type('txt').send('Not found')
    }
  })
});

module.exports = server;