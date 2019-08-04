/*

Middlewares are functions that are called multiple times by different controllers

*/

module.exports = function(req, res, next){

  if(req.session.username){
    console.log("exists")
    next()
  }else{ // remders index.hbs page
      res.render("index", {
        error : "Error"
      })
  }
}
