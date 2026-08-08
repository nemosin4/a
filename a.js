var express = require("express")
var fso = require("fs")
var app = express()
var path = require("path")
app.use(express.static(path.join(__dirname, "files/")));
app.get("/",function(req,res){
  res.sendFile("home.htm")
    })
