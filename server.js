const express = require("express")
const bodyparser = require("body-parser")
const session = require("express-session")
const cookieparser = require("cookie-parser")
const mongoose = require("mongoose")
const hbs = require("express")

const {User} = require("./user.js")
// const hbs = require("hbs")
const app = express()

mongoose.Promise = global.Promise
mongoose.connect("mongodb://localhost:27017/users", {
    useNewUrlParser:true
})

const urlencoder = bodyparser.urlencoded({
    extended:false
})

app.set('view engine', 'hbs');

app.use(cookieparser())
app.use(express.static(__dirname + "/public"))
app.use(session({
    secret: "secretname",
    name: "cookiename",
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000*60*68*24*365*2
    }
}))