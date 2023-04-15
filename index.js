const express= require('express');
const app= express();
const mongoose= require('mongoose');
const methodOverride= require('method-override');
let session= require( 'express-session');
let passport= require('passport');
let localStrategy= require('passport-local');

// connecting databse
mongoose.connect('mongodb+srv://admin:admin@hiringhub.v5qzeja.mongodb.net/?retryWrites=true&w=majority')
        .then( ()=>{
            console.log('DB connected successfully');
        })
        .catch(   (error)=>{
            console.log('error');
        });

// using the session for aurthentication
app.use( session({
    secret: 'SuperSecretPasswordForHirehub',
    resave: false,
    saveUninitialized:true,
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 24 * 60 * 60,
        expires: Date.now() + 1000 * 24 * 60 * 60
    },

}));

// for passport set up
let User=  require( './models/user-DB');
app.use( passport.initialize());
app.use(passport.session());
passport.use(new localStrategy( User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

app.use(function( req,res,next){
    res.locals.currentUser= req.user; 
    next();
});

//for using stactic files
app.use(express.static(__dirname+'/public'));
// landing page        
// app.get( '/' ,(req,res)=>{
//      res.render('landing');
// })



let jobRoutes= require('./routes/jobs.js');
app.use(jobRoutes);

let notificationRoutes=  require('./routes/notification.js');
let authenticationRoutes= require('./routes/auth.js');
let userRoutes=  require('./routes/user.js');
let questionRoutes= require('./routes/questions');

app.use(notificationRoutes);
app.use(authenticationRoutes);
app.use(userRoutes);
// app.use(questionRoutes);

// listen server
app.listen( 3000, ()=>{
    console.log('server is running at port 3000');
})