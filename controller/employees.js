var express = require('express');
var mongoose = require('mongoose')
var moment = require('moment')
//var uuid = require('uuid');
const {v4 : uuidv4} = require('uuid')
var router = express.Router();
var Employee_model = require('../model/employee_model');
var Employee = require('../repository/employee_repo');
router.get('/', function(req, res){
     Employee.get_employees(function(err,employees){
         if(err) throw err;
         res.json(employees);
     });
 })
 router.get('/:_id', function(req, res){
    Employee.get_employee(req.params._id , function(err,employee){
        if(err) throw err;
        res.json(employee);
    });
})
router.get('/search/:key_word', function(req, res, next)         {
   var key_regex = {"$regex": new RegExp('^' + req.params.key_word.toLowerCase(),  'i')};
   Employee.search_employee(key_regex, function(err,employee){
       if(err) throw err;
       res.json(employee);
   });
  });

router.post('/', function(req, res){
    var new_employee = {
        employee_id:Number(req.body.employee_id),
        employee_first_name: req.body.employee_first_name,
        employee_last_name : req.body.employee_last_name,
    }
    Employee.add_employee(new_employee,function(err,employee){
        if(err) throw err;
        res.json(employee);
    });
 })
 router.get('/new_employee_id', function(req,res){
  Employee.find_max_employee_id(function(err,emp){
      res.json(emp[0].employee_id + 1);
  });
   
 });
 router.put('/:_id', function(req, res){
     var new_employee = {
        employee_id:req.body.employee_id,
        employee_first_name: req.body.employee_first_name,
        employee_last_name : req.body.employee_last_name,
        start_time:req.body.start_time,
        end_time:req.body.end_time,
        //scheduled_hours : req.body.scheduled_hours,
        scheduled_hours:null,
        salary:null,
        //times:times
        //salary: req.body.salary
    }
     Employee.update_employee(req.params._id , new_employee, function(err,employee){
         if(err) throw err;
         res.json(employee);
     });
 })
 router.delete('/:_id', function(req, res){
     
     Employee.delete_employee(req.params._id ,  function(err,employee){
         if(err) throw err;
         res.json(employee);
     });
 })
 

   router.get('/employee_collections/:id', function get_employee_collections(req,res){
        var id = req.   params.id;
        // Employee.employee_collection(id,function(err,employee){
        //     if(err) throw err;
        //     res.json(employee);
        // });
        var emp_col = Employee.employee_collection(id)
        res.json(emp_col);
        
   });
 
module.exports = router;