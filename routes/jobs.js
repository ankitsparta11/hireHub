let express= require('express');
let router= express.Router();
let job = require('../models/jobs-DB.js');
let Notification= require('../models/notif-DB.js');

let middlewares= require('../middlewares/index.js');

router.get( '/' , function( req, res){
    res.send( 'landing page');
})

// index
router.get( '/jobs' , async function( req, res){
   try{
     
    if(req.query.search && req.query.search.length>0){

      let regex= new RegExp(req.query.search.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'));
      let jobsFound= await job.find( {name:regex});
      res.render('index.ejs',{jobsFound});
    }else{
      let jobsFound= await job.find( {});
    res.render('index.ejs',{jobsFound});
    }    
   }
   catch( error){
    console.log('error while fetching all the jobs');
   }

});

// new 
// revmoved autherization because login is not working --middlewares.isLoggedIn,middlewares.isAdmin,

router.get( '/jobs/new',middlewares.isLoggedIn , function( req ,res){
    res.render('new.ejs');
})

// create
// revmoved autherization because login is not working --middlewares.isLoggedIn,middlewares.isAdmin,
router.post( '/jobs',  async  function(req,res){
     
    try{
          // creating database object 
          let newJob= new job({
            name:req.body.name,
            address:req.body.address,
            image:req.body.image,
            deadline:req.body.deadline,
            package:req.body.package,
            type:req.body.type,
            cgpa:req.body.cgpa
          }) ;
        await newJob.save();
//adding to the notification
   let newNotif= new Notification({
       body:" A new job posted ",
       author : newJob.name
   });
  await newNotif.save();
  
        res.redirect('/jobs');
    }catch(error){
        console.log('error while adding a job ');
    }
});

// show
router.get('/jobs/:id', async function( req, res){
      try {
        // fetching the job
        let id = req.params.id;
        let jobFound = await job.findById(id);
        res.render('show.ejs', {jobFound});
      
      }
      catch(error) {
        console.log('error while fetching a job ')
      }
})

// edit
router.get('/jobs/:id/edit',middlewares.isLoggedIn,middlewares.isAdmin, async function( req,res){
    try {
        // fetching the job id
        let id = req.params.id;
        let jobFound = await job.findById(id);
        res.render('edit.ejs',{jobFound} );
      }
      catch(error) {
        console.log('error while editing a job ')
      };


});

// update
router.patch( '/jobs/:id',middlewares.isLoggedIn,middlewares.isAdmin,async  function( req,res){
       try {
        let id = req.params.id;
        let updatedJob= {
            name: req.body.name,
            address: req.body.address,
            image: req.body.image
        };
        await job.findByIdAndUpdate( id,updatedJob);
        //adding to the notification
   let newNotif= new Notification({
    body:" A new update in job ",
    author : updatedJob.name
});
await newNotif.save(); 
        res.redirect('/jobs');
       }catch (error){
         console.log('error in updating the job');
       };

})

// delete
router.delete( '/jobs/:id',middlewares.isLoggedIn,middlewares.isAdmin, async function( req,res){
    try {
        let id = req.params.id;
         await job.findByIdAndRemove(id);
         res.redirect('/jobs');

    } catch (error) {
      console.log('error in deleting the job');
    }
});

// apply
// revmoved autherization because login is not working --middlewares.isLoggedIn,
router.get( '/jobs/:jobId/apply' ,middlewares.isLoggedIn, async function( req,res){
      try {
        // if cgpa not entered
        if(!req.user.cgpa) {
          return res.send('you have not entered the cgpa');
        }
        // checking for already appliied or not 
     for( let user of appliedUsers){
      if( user._id.equals(req.user._id))
      {
         return res.send( 'you can only apply once ');
      }
     }
        
  let { jobId } =req.params;
  let curJob = await job.findById(jobId).populate('appliedUsers');
  // checking for cgpa eligibiity
  if( req.user.cgpa<curJob.cgpa ){
       return res.send( 'your are not eligible ,low cgpa');
  }
  
  curJob.appliedUsers.push(req.user);
  console.log(curJob);
  await curJob.save();
  res.redirect('/jobs');
      } catch (error) {
           console.log('error while applying for the job');
      }


})


module.exports= router;