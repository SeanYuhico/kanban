/*

Controllers folder should contain all routes dedicated to the particular document
Controllers should not directly access and manipulate the db, it should access the models folder files

*/
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
// localhost:3000/post/
router.post("/newboard", auth, (req, res)=>{
  console.log("POST /board/")

  var board = {
    boardName: req.body.name,
    members: req.body.un,
    list: {}
  }

  Board.create(board).then((board)=>{
    Board.getAll().then((boards)=>{
      res.render("home", {
        boards
      })
    })
  },(error)=>{
    res.render("index", {
      error : "some error in posting: " + error
    })
  })

})

// localhost:3000/post/someid
router.get("/:id", (req, res)=>{
  console.log("POST /board/"+req.params.id)
  Post.get(req.params.id).then((board)=>{
    console.log(board)
    res.render("board", {
      board
    })
  },(error)=>{
    res.render("home", {
      error
    })
  })
})

// always remember to export the router
module.exports = router
