var express = require("express");
var body_parser = require("body-parser");
var mongoose = require("mongoose");
//var config = "mongodb+srv://jaitesting1:jaitesting1@jaicluster.ikjvw.mongodb.net/?retryWrites=true&w=majority"
var config ="mongodb+srv://jaitesting1:jaitesting1@jaicluster.ikjvw.mongodb.net/emp_pay?retryWrites=true&w=majority"
mongoose.connect(config, function(error){
    if(error) console.log(error);
        console.log("connection successful");
});
var app = express();
var port = 4000;
app.get('/', function(req,res){
    res.send("hello this is from Jai")
});

app.use(body_parser.urlencoded({extended:true}));
app.use(body_parser.json())
var employee = require("./controller/employees")
app.use("/api/employees",employee);
var schedule = require("./controller/schedules")
app.use("/api/schedules",schedule);
var payroll = require("./controller/payroll");
app.use("/api/payroll",payroll);
app.listen(port,function(){
   console.log("server is listening on port: "+ port) 
});