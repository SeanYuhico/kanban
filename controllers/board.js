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

$( document ).ready(function() {
  $('.add-lane-form').toggle();
  $(".edit").click(function() {
      $(this).hide();
      $(".description-container").addClass("description-editable");
      $(".description-text").attr("contenteditable", "true");
      $(".save").show();
    });
    
    $(".save").click(function() {
      $(this).hide();
      /*
          This is where you save the text
          description-text will contain the new text
          save contents of description-text to db
      */
  
      $(".description-container").removeClass("description-editable");
      $(".description-text").removeAttr("contenteditable");
      $(".edit").show();
  });
  
  $(document).on( "click", function( event ) {
      if (event.target.matches(".add-lane-toggle")) {
          $('.add-lane-form').toggle();
      } else if (!event.target.matches(".add-lane-form") && $('.add-lane-form').is(":visible") === true) {
          $('.add-lane-form').toggle();
      } 

  });

  $(".lanename").click(function() {
      // get id of lane
  });


  // this is for adding  a lane
  $("button#new-lane-button").click(function(){
      let name = $("#new-card-name").text();

      // let boardid = ???
      console.log(name);
      
      $.ajax({
          url: "../new-lane/" + id,
          method: "POST",
          data:{
              listname: name
          }, 
          success: function(result){
              console.log(result);
              
              //place db shit here
              
          }
      });
  });

  // this is for adding a card
  // this needs to be changed to accomodate the list id since wala pa yun
  $("button#save-new-card").click(function(){
      let name = $("#new-card-name").text(),
          desc = $("#new-card-desc").text(),
          img = $("#new-img").val();

      // let listid = ???

      console.log(name);
      console.log(desc);
      console.log(img);
      
      $.ajax({
          url: "../new-card/" + id,
          method: "POST",
          data:{
              cardname: name,
              carddesc: desc,
              filename: img
          }, 
          success: function(result){
              console.log(result);
              
              //place db shit here
              
          }
      });
  });


  // this is for updating a card
  $("button#save-edit-card").click(function(){
      let id = $(this).attr("data-id"),
          name = $("#edit-card-name").text(),
          desc = $("#edit-card-desc").text(),
          img = $("#edit-img").val();

      console.log(id);
      console.log(name);
      console.log(desc);
      console.log(img);
      
      $.ajax({
          url: "../edit-card/" + id,
          method: "PUT",
          data:{
              id: id,
              cardname: name,
              carddesc: desc,
              filename: img
          }, 
          success: function(result){
              console.log(result);
              
              //place db shit here
              
          }
      });
  });
});

// always remember to export the router
module.exports = router
