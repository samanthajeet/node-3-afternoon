const express = require('express');
require('dotenv').config();
const { json } = require('body-parser');
const app = express();
const session = require('express-session')
const checkForSession = require('./middlewares/checkForSession');
const sc = require('./controllers/swag_controller');
const as = require('./controllers/auth_controller');
const cc = require('./controllers/cart_controller');
const search = require('./controllers/search_controller')


const { SERVER_PORT, SESSION_SECRET } = process.env

app.use(json())
app.use(session ({
  secret: SESSION_SECRET, 
  resave: false,
  saveUninitialized: true,
  // cookie: {
  //   maxAge: 1000 * 60 * 60
  // }
}))

app.use(checkForSession);


//swag
app.get(`/api/swag`, sc.read)


//auth
app.get(`/api/user`, as.getUser)

app.post(`/api/login`, as.login)

app.post(`/api/register`, as.register)

app.post(`/api/signout`, as.signout)

//cart

app.post(`/api/cart`, cc.add)

app.post(`/api/cart/checkout`, cc.checkout)

app.delete(`/api/cart`, cc.delete)

//search

app.get(`/api/search`, search.search )



app.listen( SERVER_PORT, () => console.log(`Bingpot on ${SERVER_PORT}`))