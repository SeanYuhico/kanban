/*

Controllers folder should contain all routes dedicated to the particular document
Controllers should not directly access and manipulate the db, it should access the models folder files

*/
const express = require("express")
const router = express.Router()
const Board = require("../models/board")
const List = require("../models/list")
const bodyparser = require("body-parser")
const auth = require("../middlewares/auth")

const app = express()

const urlencoder = bodyparser.urlencoded({
  extended : true
})
let boardID
let listID

router.use(urlencoder)
// localhost:3000/post/
router.post("/", auth, (req, res)=>{
  console.log("POST /board/")

  var post = {
    text : req.body.text
  }

  Board.create(board).then((board)=>{
    Board.getAll().then((board)=>{
      res.render("home", {
        board
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
  boardID=req.params.id
  console.log(req.params.id)
  console.log("1")
  console.log("POST /board/"+req.params.id)
  Board.get(req.params.id).then((board)=>{
    console.log("gumana")
    res.render("board", board)
  },(error)=>{
    res.render("home", {
      error
    })
  })
})

router.post("/new-lane", (req,res)=>{
  // let currUser = req.session.username
  
  let list = {
      listName : req.body.listName,
      cards: [{}]
    }
  
    // let lists = [list]
    // console.log(req.params.id)
    console.log(boardID)
    
    List.create(list).then((list)=>{
      console.log("successful list creation " + list)
      //   req.session.username = user.username
      console.log(req.body.listName)
      
      // res.redirect("../dashboard/boards")
      res.send(list)
      listID=list._id
    },(error)=>{
      // res.render("/dashboard/boards", {
        // error : "some error in adding board: " + error
      // })
    })

    let newBoard = {
      // boardName : req.body.boardName,
      members : req.session.username,
      lists : list
    }
    // console.log(newBoard)
    // Board.get(boardID).then((board)=>{
    //   console.log(board.boardName)
    //   newBoard.boardName=board.boardName
    //   newBoard.members=board.members
      newBoard.lists.push(lists)
    // })
    Board.edit(boardID, newBoard).then((board)=>{
      // board.lists.push(list)
      console.log("successful board edit: " + board)
    })
})

router.get("/sample", function(req, res) {
  //gawin lahat ng shits regarding db and saving sa new list
  //pwede din isave new order dito 
  let list = {
    bading: ["ANUNA", "GUMANA KA"]
  }
  res.send({
    status: "SUCCESS",
    data: list
  });
})

// always remember to export the router
module.exports = router
