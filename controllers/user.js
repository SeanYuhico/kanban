/*

Controllers folder should contain all routes dedicated to the particular document
Controllers should not directly access and manipulate the db, it should access the models folder files

*/
const express = require("express")
const router = express.Router()
const User = require("../models/user")
const bodyparser = require("body-parser")
const auth = require("../middlewares/auth")
const Board = require("../models/board")

const app = express()

const urlencoder = bodyparser.urlencoded({
  extended : true
})

router.use(urlencoder)

// localhost:3000/user/register
router.get("/register", urlencoder, (req, res)=>{
  console.log("get /user/register")
  
  res.render("register", {
    
  })
})

router.post("/register", (req, res)=>{
  console.log("get /user/register")
  var user = {
    username : req.body.username,
    password : req.body.password
  }

  User.create(user).then((user)=>{
      console.log("successful " + user)
      req.session.username = user.username
      // res.render("dashboard", {
      //   // user
      // })
      res.redirect("../dashboard/boards")
  },(error)=>{
    res.render("/register", {
      error : "some error in registering: " + error
    })
  })

})

router.get("/login", urlencoder, (req, res)=>{
  console.log("get /user/login")
  
  res.render("login", {
    
  })
})

// localhost:3000/user/login
router.post("/login", (req, res)=>{
  console.log("POST /user/login")
  let user = {
    username : req.body.username,
    password : req.body.password
  }
  console.log("post login " + req.body.username)
  console.log("post login " + user)

  User.authenticate(user).then((newUser)=>{
    console.log("authenticate " + newUser)
    if(newUser){
      req.session.username = user.username
      console.log("pumasok siya dito")
      res.redirect("../dashboard/boards")
      // Board.getAll().then((boards)=>{
      //   res.render("dashboard", {
      //     boards
      //   })
        
      // }, (error)=> {
      //   console.log("may error dito");
      //   res.render("login",{
      //     error : "some error in logging in: " + error
      //   })
      // })
    } else {
      reject(new Error("No user"))
    }
  
  }).catch((error) => {
    console.log("No User")
    res.redirect("../user/login?error=login_error")
  })
})

router.post("/logout", (req,res)=>{
  console.log("POST /user/logout")
  res.redirect("../user/login")
})

// always remember to export the router for index.js
module.exports = router
