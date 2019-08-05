/*

Model folder should contain all direct database access and manipulation
Model files should not include request, response, or view objects
Model files must be created independent of each other. Deleting one model file will not affect the others

*/

const mongoose = require("mongoose")

let postSchema = mongoose.Schema({
    text: String
})

let Post = mongoose.model("post", postSchema)

exports.create = function(post){
  return new Promise(function(resolve, reject){
    var p = new Post(post)

    p.save().then((newPost)=>{
      resolve(newPost)
    }, (err)=>{
      reject(err)
    })
  })
}

exports.get = function(id){
  return new Promise(function(resolve, reject){
    Post.findOne({_id:id}).then((post)=>{
      console.log(post)
      resolve(post)
    }, (err)=>{
      reject(err)
    })
  })
}

exports.getAll = function(){
  return new Promise(function(resolve, reject){
    Post.find().then((posts)=>{
      resolve(posts)
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
    }).then((newPost)=>{
      resolve(newPost)
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
