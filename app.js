const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const seedDB = require('./seed');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/User');


const productRoutes = require('./routes/product');
const reviewRoutes = require('./routes/review');
const authRoutes = require('./routes/auth');



//return promise
mongoose.connect('mongodb://127.0.0.1:27017/shopping-e-commerce')
    .then(() => {
        console.log("DB Connected Successfully");

    })
    .catch((err) => {
        console.log("Error :-", err);
    });


// session 
let configSession = {
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 24 * 7 * 60 * 60 * 1000,
        maxAge: 24 * 7 * 60 * 60 * 1000
    }
}

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
//views folder
app.set('views', path.join(__dirname, 'views'));
//public folder
app.use(express.static(path.join(__dirname, 'public')));
//for req.body
app.use(express.urlencoded({ extended: true }))
//method Override
app.use(methodOverride('_method'));
//session
app.use(session(configSession))
//flash
app.use(flash());
//locals
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})
//Passport
app.use(passport.initialize());
app.use(passport.session());
// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));



// seeding database
// seedDB()


app.use(productRoutes); //so that har incoming request ke liye path check kiya jaye
app.use(reviewRoutes); //so that har incoming request ke liye path check kiya jaye
app.use(authRoutes); //so that har incoming request ke liye path check kiya jaye



app.listen(8080, () => {
    console.log("Server is connected successfully at 8080 port");
})