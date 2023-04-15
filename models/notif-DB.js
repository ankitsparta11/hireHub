let  mongoose= require('mongoose');

// schema
let notifSchema= new mongoose.Schema({

    body:String,
    author:String
}) ;

// model
let Notification=  mongoose.model( 'notifications' , notifSchema );

module.exports= Notification;