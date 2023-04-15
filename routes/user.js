
let express= require('express');
let router= express.Router();
let User= require( '../models/user-DB');
let Notification= require('../models/notif-DB.js');
// show

router.get('/users/:id' , async function( req,res){
    try {
        let id= req.params.id;
        let user= await User.findById(id);
        res.render('show-user.ejs',{user});

    } catch (error) {
           console.log('error while fecting the user details');        
    }
})

// edit 
router.get('/users/:id/edit', async function( req,res){
    try {
        // fetching the job id
        let id = req.params.id;
        let user = await User.findById(id);
        res.render('edit-user.ejs',{user} );
      }
      catch(error) {
        console.log('error while editing a user ')
      };
});

//update
router.patch( '/users/:id',async  function( req,res){
    try {
     let id = req.params.id;
     let updatedJob= {
         name: req.body.name,
        username:req.body.username
     };
     await User.findByIdAndUpdate( id,updatedJob);
     //adding to the notification
let newNotif= new Notification({
 body:" user updated ",
 author : req.body.name
});
await newNotif.save(); 
        res.redirect('/');
       }catch (error){
         console.log('error in updating the user');
       };
})

// delete
router.delete( '/user/:id', async function( req,res){
    try {
        let id = req.params.id;
         await User.findByIdAndRemove(id);
         res.redirect('/');

    } catch (error) {
      console.log('error in deleting the job');
    }
});

module.exports= router;