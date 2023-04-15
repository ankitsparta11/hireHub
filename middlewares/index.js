// a middleware for checking the user logged in or not

const isLoggedIn= function( req, res, next){
    if( req.isAuthenticated()){
      next();
    }else{
      console.log( ' you are not logged in');
      res.redirect('/login');
    }
  }
  // authrization
  const isAdmin = function( req,res,next){
    if( req.user && req.user.isAdmin==true) {
        next();
    }
    else{
      res.send( ' you dont  have  permission to do so');
    }
  }

  module.exports={
    isLoggedIn,
    isAdmin
  }