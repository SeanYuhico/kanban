/*

Model folder should contain all direct database access and manipulation
Model files should not include request, response, or view objects
Model files must be created independent of each other. Deleting one model file will not affect the others

*/

const mongoose = require("mongoose")

var boardSchema = mongoose.Schema({
    boardName: String,
    members: [],
    lists: []
})

var Board = mongoose.model("board", boardSchema)

exports.addToBoardList = function(id, list_id, card) {
  
}
exports.create = function(board){
  return new Promise(function(resolve, reject){
    var p = new Board(board)

    p.save().then((newBoard)=>{
      console.log(newBoard)
      console.log("saved1")
      resolve(newBoard)
      console.log("saved2")
    }, (err)=>{
      console.log("not saved")
      reject(err)
    })
  })
}

exports.get = function(id){
  return new Promise(function(resolve, reject){
    Board.findOne({_id:id}).then((board)=>{
      console.log(board)
      resolve(board)
    }, (err)=>{
      reject(err)
    })
  })
}


exports.addtoBoard = function(boardid, listid, card){
  return new Promise(function(resolve, reject){
    listid = mongoose.Types.ObjectId(listid);
    console.log("UTOT");
    console.log(listid);
    console.log(card);

    Board.updateOne(
      {"lists._id": listid},
      {"$push": {"lists.$.cards": card}},
    ).then((newBoard)=>{
      resolve(newBoard)
    }, (err)=>{
      reject(err)
    })
  })
}


exports.getAll = function(){
  return new Promise(function(resolve, reject){
    Board.find().then((boards)=>{
      resolve(boards)
      console.log("working")
    }, (err)=>{
      reject(err)
    })
  })
}

exports.edit = function(id, update){
  return new Promise(function(resolve, reject){
    Board.findByIdAndUpdate({
      _id : id
    }, update, {
      new : true
    }).then((newBoard)=>{
      resolve(newBoard)
    }, (err)=>{
      reject(err)
    })
  })
}


exports.addList = function(id, list){
  return new Promise(function(resolve, reject){
    Board.findByIdAndUpdate({
      _id : id
    }, {$push: {lists: list}}).then((newBoard)=>{
      resolve(newBoard)
    }, (err)=>{
      reject(err)
    })
  })
}

exports.delete = function(id){
  return new Promise(function(resolve, reject){
    Board.remove({
      _id : id
    }).then((result)=>{
      resolve(result)
    }, (err)=>{
      reject(err)
    })
  })
}
