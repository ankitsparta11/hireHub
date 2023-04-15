let express= require('express');
let router= express.Router();
let Question= require('../models/question-DB');
let Job =require('../models/jobs-DB.js');
//index
router.get( '/jobs/:id/questions' ,async function( req,res){
    try {
        let questions= await Question.find({});
        res.render( 'show-questions.ejs',{questions});

    } catch (error) {
        console.log('error while fetching the questions')
    }

})

//new
router.get('/jobs/:id/questions/' , function( req,res){
    res.render( 'new-question.ejs');
})
// create
// router.post( '/jobs/:id/questions' ,async (req,res)=>{
//     try {
//          // create a database object     
//     let question= new Question({
//         description: req.body.description,
//         option1:req.body.option1,
//         option2:req.body.option2,
//         option3:req.body.option3,
//         option4:req.body.option4,
//         correctOption:req.body.correctOption,
//     });
//     // save 
//     await question.save();
//     // adding to the jobs
//     let job= await Job.findById(req.params.id);
//     job.questions.push(question);
//     res.redirect('/jobs/req.params.id/${}');
        
//     } catch (error) {
//         console.log('error inn adding a job');
//     }
    
   
// })

// delete 

module.exports= router;