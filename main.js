const express = require('express')
const pug = require('pug')
const expressession = require('express-session')
const cookieParser = require('cookie-parser')
const app = express()
const bodyparser = require ('body-parser');
const PORT = process.env.PORT || 8080
const db = require('./db.js')
var fs   = require('fs');
var passport = require('passport');



app.set('views', './views/')
app.set('view engine', 'pug')


app.use(expressession({
    cookieName: 'session',
    secret: 'Popey',
    resave: false,
    saveUninitialized: false
  }));

app.use(bodyparser.json());
app.use(bodyparser.urlencoded());
app.use(cookieParser('Popey'));
app.use(expressession());


app.use((req, res, next) => {
    if(req.url == '/user/login' || req.session.id){
        next()
    }
    else{
        res.redirect('/user/login')
    }
})

app.get('/', function(req, res) {
    res.redirect('/user/login')
});

app.use('/todos', require('./controllers/todos'))
app.use('/user', require('./controllers/users'))


app.listen(PORT, () => {
 console.log('Serveur sur port : ', PORT)
})