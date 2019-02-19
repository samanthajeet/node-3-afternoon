const express = require('express');
require('dotenv').config();
const { json } = require('body-parser');
const app = express();
const session = require('express-session')
const checkForSession = require('./middlewares/checkForSession');
const ctrl = require('./controllers/swag_controller');


const { SERVER_PORT, SESSION_SECRET } = process.env

app.use(json())
app.use(session ({
  secret: SESSION_SECRET, 
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60
  }
}))

app.use(checkForSession);

app.get(`/api/swag`, ctrl.read)



app.listen( SERVER_PORT, () => console.log(`Bingpot on ${SERVER_PORT}`))