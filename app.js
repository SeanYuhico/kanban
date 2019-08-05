/*

app.js file does all the set-up
app.js passes the routing to the controllers folder
app.js starts the server

*/

const express = require("express")
const bodyparser = require("body-parser")
const hbs = require("hbs")
const mongoose = require("mongoose")
const session = require("express-session")

const app = express()

mongoose.Promise = global.Promise
mongoose.connect("mongodb://localhost:27017/kanban", {
  useNewUrlParser:true
})
app.set("view engine", "hbs")
// const publicPath = path.resolve(__dirname, "public");
// app.use(express.static(publicPath));
app.use(express.static(__dirname + "/public"))

app.use(session({ 
  secret : "secret",
  name : "secretname",
  resave: true,
  saveUninitialized :true
}))

app.use(require("./controllers"))

app.listen(5000, (req,res)=>{
  console.log("live at port 5000")
})
