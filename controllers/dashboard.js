const express = require("express")
const router = express.Router()
const Board = require("../models/board")
const bodyparser = require("body-parser")
const auth = require("../middlewares/auth")
const Board = require("../models/board")

const app = express()

const urlencoder = bodyparser.urlencoded({
  extended : true
})

router.use(urlencoder)

// $(document).ready(function(){
//     // TODO: put script for update and delete
//     $("button.delete").click(function(){
//         console.log($(this).attr("data-id"))
//         $.ajax({
//             url: "delete",
//             method: "POST",
//             data:{
//                 id: $(this).attr("data-id")
//             },
//             success: function(result){
//                 if(result.ok == 1){
//                     alert("successfully deleted")
//                     $("tr[data-id='"+id+"']").remove()
//                 } else {
//                     alert("something went wrong")
//                 }
//             }
//         })
//     })
// })

router.get("/boards", (req,res)=>{
    Board.getAll().then((boards)=>{
        res.render("dashboard", {
          boards
        })
        
      }, (error)=> {
        console.log("may error dito");
        res.render("login",{
          error : "some error in logging in: " + error
        })
      })
})

router.post("/add",(req,res)=>{
    let board = {
        boardName : req.body.name,
        
      }
    
      Board.create(board).then((board)=>{
          console.log("successful " + board)
        //   req.session.username = user.username
          res.render("dashboard", {
            board
          })
      },(error)=>{
        // res.render("/register", {
        //   error : "some error in registering: " + error
        // })
      })
})