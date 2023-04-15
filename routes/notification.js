let express= require('express');
let router= express.Router();
// model
let Notification= require('../models/notif-DB');

let middlewares= require('../middlewares/index.js');
// index
router.get( '/notifications', async function(req,res){
       try {
        let allNotifs= await Notification.find({});
        res.render('notifications/index.ejs', {allNotifs});

       } catch (error) {
         console.log('error whille fetching all notifs')
       }
} )

// new
router.get('/notifications/new' , middlewares.isLoggedIn,function(req,res){
    res.render('notifications/new.ejs');
})

// create
router.post('/notifications', async function(req,res){
    try {
        //1. making database object
    let newNotif= new Notification({
        body: req.body.body,
        author:req.body.author
    })
    //2. save to database
     await newNotif.save();
     res.redirect('/notifications');
        
    } catch (error) {
          console.log('error while posting new notification');
    }
})

//delete
router.delete('/notifications/:id', middlewares.isLoggedIn,middlewares.isAdmin, async function(req,res){
    try {
      
       await  Notification.findByIdAndDelete(req.params.id);
         res.render('/notifications');

    } catch (error) {
        console.log(' eroor while deleting the notification');
    }
})






module.exports=router;