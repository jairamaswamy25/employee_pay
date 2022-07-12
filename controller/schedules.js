var express = require('express');
var moment = require('moment');
const { Schema, Mongoose } = require('mongoose');
//var uuid = require('uuid');
const {v4 : uuidv4} = require('uuid')
var router = express.Router();
var Schedule = require('../repository/schedule_repo');
var Employee = require('../repository/employee_repo')
router.get('/', function(req, res){
    //res.send("test router");
     Schedule.get_schedules(function(err,schedules){
         if(err) throw err;
         res.json(schedules);
     });
 })
 
router.post('/', function(req, res){
    var new_schedule = {
        start_time:req.body.start_time,
        end_time:req.body.end_time,
        scheduled_hours:null,
        salary:null,
        Employee:req.body._id,
        paid:"No"
        //employee_id:req.body.employee_id
    }
    var id = req.body._id
    new_schedule.scheduled_hours = moment.duration(moment(new_schedule.end_time).diff(moment(new_schedule.start_time))).asHours()
    new_schedule.salary =(new_schedule.scheduled_hours * 30).toFixed(2);
    
    Schedule.add_schedule(new_schedule,function(err,schedule){
        if(err) throw err;
        //res.json(schedule);
        Employee.update_emp_sch_by_id(id ,schedule,function(err,emp){
            if(err) throw err;
            //employee.schedule.add_schedule(new_schedule);
            res.json(emp);
        });
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
 router.get('/:_id', function(req, res){
    
     Employee.get_employee(req.params._id , function(err,employee){
         if(err) throw err;
         res.json(employee);
     });
 })
 router.get('/name/:name', function getMidSearchResults(req, res, next)         {
    var key_regex = {"$regex": new RegExp('^' + req.params.name.toLowerCase(),  'i')};
    Employee.search_employee(key_regex, function(err,employee){
        if(err) throw err;
        res.json(employee);
    });
   });
 
module.exports = router;