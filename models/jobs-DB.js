let mongoose= require('mongoose');
const Question = require('./question-DB');

// making schema 
let jobSchema= new mongoose.Schema( {
      name :String,
      address: String,
      image:String,
      package: Number,
      cgpa:Number,
      deadline:Date,
      type:{
            type:String,
            default: 'fulltime',
            Enum: [ 'fulltime', 'part-time', 'intern']
      },
      appliedUsers :[
            {
                  type:mongoose.SchemaTypes.ObjectId, 
                  ref: 'user'
            }
      ],
      Questions :[
            {
                  type:mongoose.Schema.Types.ObjectId,
                  ref: 'question'
            }
      ]

});

//making model 
let job= mongoose.model( 'job' ,jobSchema);
module.exports= job;

