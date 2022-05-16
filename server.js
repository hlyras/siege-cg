const express = require('express');
const path = require('path');
const app = express();
const http = require("http");
const cors = require('cors');
const socketio = require('socket.io');

const server = http.createServer(app);

require('dotenv').config();

const io = socketio(server);

const match = require('./app/socket/match');
match.connection(io);

// app.set('socketio', io);

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('views', path.join(__dirname, 'app/view'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./app/routes/index'));

module.exports = server;