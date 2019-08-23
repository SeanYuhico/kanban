/*

Controllers folder should contain all routes dedicated to the particular document
Controllers should not directly access and manipulate the db, it should access the models folder files

*/
const express = require("express")
const router = express.Router()
const Board = require("../models/board")
const List = require("../models/list")
const Card = require("../models/card")
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
      listName : req.body.listName
  }
  
    // let lists = [list]
    // console.log(req.params.id)
    console.log(boardID)
    
    List.create(list).then((list)=>{
      console.log("successful list creation " + list)
      //   req.session.username = user.username
      console.log(req.body.listName)


      Board.addList(boardID, list);
      res.send(list)
      // listID=list._id
    },(error)=>{
      // res.render("/dashboard/boards", {
        // error : "some error in adding board: " + error
      // })
    })
})
router.post("/new-card",(req,res)=>{
  console.log("it went in sa /new-card")
  let listid= req.body.listID
  let boardID = req.body.boardID
  let newCard = {
    cardName: req.body.cardName,
    members: req.session.username,
    description: req.body.description,
    imgname: req.body.imgname,
    originalimgname: req.body.imgname
  }
  console.log("THIS IS NEWCARD:")
  console.log(newCard)
  
  Card.create(newCard).then((newCard)=>{
    console.log("successful card creation " + newCard)
    console.log(req.body.listName)
    console.log(newCard._id)
    let boardCard = {
      _id: newCard._id,
      cardName: req.body.cardName,
      members: req.session.username,
      description: req.body.description,
      imgname: req.body.imgname,
      originalimgname: req.body.imgname
    }

    Board.addtoBoard(boardID, listid, boardCard).then((card)=>{
      console.log("successful add card to board " + card)
      res.send(card)
    },(error)=>{
      console.log("ERROR")
      console.log(error)
    })
    res.send(list)
  },(error)=>{
    
  })

  /*
  Board.addtoBoard(boardID, listid, newCard).then((card)=>{
    console.log("successful add card to board " + card)
    res.send(card)
    // listID=list._id
  },(error)=>{
    console.log("ERROR")
    console.log(error)
  })
  */
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
