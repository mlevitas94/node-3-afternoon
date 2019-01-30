const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
require('dotenv').config();
const check = require('./middlewares/checkForSession')
const swag_controller = require('./controllers/swag_controller'); 
const auth = require('./controllers/auth_controller')
const cart = require('./controllers/cart_controller')
const search = require('./controllers/search_controller')



const app = express();
app.use( bodyParser.json() );
app.use( session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use( check );
app.use( express.static( `${__dirname}/../build` ) );



//swag
app.get('/api/swag', swag_controller.read)
app.get('/api/search', search.search)

//auth
app.post( '/api/login', auth.login );
app.post( '/api/register', auth.register );
app.post( '/api/signout', auth.signout );
app.get( '/api/user', auth.getUser );

//cart control

app.post( '/api/cart', cart.add );
app.post( '/api/cart/checkout', cart.checkOut );
app.delete( '/api/cart', cart.remove );












const port = process.env.SERVER_PORT || 3333;
app.listen( port, () => { console.log(`Now arriving at ${port}.`); } );