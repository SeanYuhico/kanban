/*

Model folder should contain all direct database access and manipulation
Model files should not include request, response, or view objects
Model files must be created independent of each other. Deleting one model file will not affect the others

*/

const mongoose = require("mongoose")

var listSchema = mongoose.Schema({
    listName: String,
    // members: [],
    cards: []
})

let List = mongoose.model("list", listSchema)

exports.create = function(list){
  return new Promise(function(resolve, reject){
    var p = new List(list)

    p.save().then((newList)=>{
      resolve(newList)
    }, (err)=>{
      reject(err)
    })
  })
}

exports.get = function(id){
  return new Promise(function(resolve, reject){
    List.findOne({_id:id}).then((list)=>{
      console.log(list)
      resolve(list)
    }, (err)=>{
      reject(err)
    })
  })
}

exports.getAll = function(){
  return new Promise(function(resolve, reject){
    List.find().then((lists)=>{
      resolve(lists)
    }, (err)=>{
      reject(err)
    })
  })
}

exports.search = function(name){
  return new Promise(function(resolve, reject){
    List.findOne({listName:name}, function(err,obj){
      console.log(obj)
    })
  })
}

exports.edit = function(id, update){
  return new Promise(function(resolve, reject){
    List.findByIdAndUpdate({
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

exports.addCard = function(id, card){
  return new Promise(function(resolve, reject){
    List.findByIdAndUpdate({
      _id : id
    }, {$push: {cards: card}}).then((newList)=>{
      resolve(newList)
    }, (err)=>{
      reject(err)
    })
  })
}

exports.delete = function(id){
  return new Promise(function(resolve, reject){
    List.remove({
      _id : id
    }).then((result)=>{
      resolve(result)
    }, (err)=>{
      reject(err)
    })
  })
}
