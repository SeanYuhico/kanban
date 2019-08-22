const express = require("express")
const router = express.Router()
const Board = require("../models/board")
const bodyparser = require("body-parser")
const auth = require("../middlewares/auth")

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
        console.log(req.params.boardName)
      }, (error)=> {
        console.log("may error dito");
        res.render("login",{
          error : "some error in logging in: " + error
        })
      })
})

router.post("/add",(req,res)=>{
  console.log("get /user/register")
  let currUser = req.session.username
  let board = {
      boardName : req.body.boardname,
      members: [{currUser}],
      lists: [{}]
    }
  
    Board.create(board).then((board)=>{
        console.log("successful " + board)
      //   req.session.username = user.username
      console.log(req.body.boardname + " " + "1")
      res.redirect("../dashboard/boards")
    },(error)=>{
      res.render("/dashboard/boards", {
        error : "some error in adding board: " + error
      })
    })
})

// router.get("/:id", (req, res)=>{
//   console.log("dashboard")
//   console.log("POST /post/"+req.body.boardname)
//   res.redirect("../board/:id")
// })

module.exports = router;