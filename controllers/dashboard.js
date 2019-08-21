const express = require("express")
const router = express.Router()
const User = require("../models/user")
const bodyparser = require("body-parser")
const auth = require("../middlewares/auth")
const Board = require("../models/board")

const app = express()

const urlencoder = bodyparser.urlencoded({
  extended : true
})

router.use(urlencoder)

$(document).ready(function(){
    // TODO: put script for update and delete
    $("button.delete").click(function(){
        console.log($(this).attr("data-id"))
        $.ajax({
            url: "delete",
            method: "POST",
            data:{
                id: $(this).attr("data-id")
            },
            success: function(result){
                if(result.ok == 1){
                    alert("successfully deleted")
                    $("tr[data-id='"+id+"']").remove()
                } else {
                    alert("something went wrong")
                }
            }
        })
    })
})

router.post("/",(req,res)=>{
    
})