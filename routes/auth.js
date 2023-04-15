let express= require('express');
let router= express.Router();
let User= require( '../models/user-DB');
const passport = require('passport');

router.get( '/register' , function( req,res){
    // registration form
    res.render( 'register.ejs');
})

router.post( '/register' , async function( req,res){
        // making user  
    let user= new User({
            username: req.body.username,
            name: req.body.name
           });
           // registering using the , register is the function of passport
           let registeredUser= await User.register( user , req.body.password);
           // login
           req.login( registeredUser , (error)=>{
               if( error){
                    console.log('error ewhile registering the user');
               }
             res.redirect('/jobs');      
               
   })
})

router.get( '/login' ,  function( req,res){
    // login form
    res.render( 'login.ejs');
});

router.post( '/login' ,passport.authenticate('local', { failureRedirect: '/login', failureMessage: true },), function( req,res){
        
            res.redirect('/jobs'); 
      
});

router.get( '/logout' ,function( req,res){
    req.logOut( function(error){
        if(error){
            console.log( 'error while logging out');
        }
        else{
            res.redirect('/jobs');
        }
    });
  
})

module.exports= router;