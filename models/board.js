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

exports.create = function(board){
  return new Promise(function(resolve, reject){
    var p = new Board(board)

    p.save().then((newBoard)=>{
      resolve(newBoard)
    }, (err)=>{
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

exports.getAll = function(){
  return new Promise(function(resolve, reject){
    Board.find().then((boards)=>{
      resolve(boards)
    }, (err)=>{
      reject(err)
    })
  })
}

exports.edit = function(id, update){
  return new Promise(function(resolve, reject){
    Board.findOneAndUpdate({
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
