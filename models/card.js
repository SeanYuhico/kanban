/*

Model folder should contain all direct database access and manipulation
Model files should not include request, response, or view objects
Model files must be created independent of each other. Deleting one model file will not affect the others

*/

const mongoose = require("mongoose")

var cardSchema = mongoose.Schema({
    cardName: String,
    members: {},
    description: String,
    imgname: String,
    originalimgname: String
})

var boardSchema = mongoose.Schema({
  boardName: String,
  members: [],
  lists: []
})

var listSchema = mongoose.Schema({
  listName: String,
  // members: [],
  cards: []
})

const Card = mongoose.model("card", cardSchema)

exports.create = function(card){
  return new Promise(function(resolve, reject){
    var p = new Card(card)

    p.save().then((newCard)=>{
      resolve(newCard)
    }, (err)=>{
      reject(err)
    })
  })
}

exports.get = function(id){
  return new Promise(function(resolve, reject){
    Card.findOne({_id:id}).then((card)=>{
      console.log(card)
      resolve(card)
    }, (err)=>{
      reject(err)
    })
  })
}

exports.getAll = function(){
  return new Promise(function(resolve, reject){
    Card.find().then((cards)=>{
      resolve(cards)
    }, (err)=>{
      reject(err)
    })
  })
}

exports.edit = function(id, update){
  return new Promise(function(resolve, reject){
    Card.findOneAndUpdate({
      _id : id
    }, update, {
      new : true
    }).then((newcard)=>{
      resolve(newcard)
    }, (err)=>{
      reject(err)
    })
  })
}

exports.delete = function(id){
  return new Promise(function(resolve, reject){
    Card.remove({
      _id : id
    }).then((result)=>{
      resolve(result)
    }, (err)=>{
      reject(err)
    })
  })
}
