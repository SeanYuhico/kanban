/*

Model folder should contain all direct database access and manipulation
Model files should not include request, response, or view objects
Model files must be created independent of each other. Deleting one model file will not affect the others

*/

const mongoose = require("mongoose")

var listSchema = mongoose.Schema({
    boardName: String,
    members: {},
    lists: {}
})

var Board = mongoose.model("list", listSchema)

exports.create = function(list){
  return new Promise(function(resolve, reject){
    var p = new Post(list)

    p.save().then((newList)=>{
      resolve(newList)
    }, (err)=>{
      reject(err)
    })
  })
}

exports.get = function(id){
  return new Promise(function(resolve, reject){
    Post.findOne({_id:id}).then((list)=>{
      console.log(list)
      resolve(list)
    }, (err)=>{
      reject(err)
    })
  })
}

exports.getAll = function(){
  return new Promise(function(resolve, reject){
    Post.find().then((boards)=>{
      resolve(boards)
    }, (err)=>{
      reject(err)
    })
  })
}

exports.edit = function(id, update){
  return new Promise(function(resolve, reject){
    Post.findOneAndUpdate({
      _id : id
    }, update, {
      new : true
    }).then((newList)=>{
      resolve(newList)
    }, (err)=>{
      reject(err)
    })
  })
}

exports.delete = function(id){
  return new Promise(function(resolve, reject){
    Post.remove({
      _id : id
    }).then((result)=>{
      resolve(result)
    }, (err)=>{
      reject(err)
    })
  })
}
