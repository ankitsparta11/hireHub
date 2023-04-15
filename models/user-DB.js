let mongoose= require('mongoose');
let passportlocalmongoose= require('passport-local-mongoose');

let userSchema= new mongoose.Schema({
    username: {
        type:String,
        required:true,
        unique:true
    },
    isAdmin :{
        type :Boolean,
        default:false
    },
    name :{
        type:String
    },
    cgpa: Number,
    selected:{
        type:Boolean,
        default: false
    }


});

// plugin of other library to perform something i data base is supported by mongoose using plugin
mongoose.plugin(passportlocalmongoose);

let user= mongoose.model( 'user' ,userSchema);
module.exports=user;
