var express = require('express');
var mongoose = require('mongoose')
var moment = require('moment')
const {v4 : uuidv4} = require('uuid')
var router = express.Router();
var Employee_model = require('../model/employee_model');
var Employee = require('../repository/employee_repo');
var Schedule = require('../repository/schedule_repo');
var Payroll = require('../repository/payroll_repo');

router.get('/:id', function(req, res){
    var id = req.params.id
    Schedule.generate_employee_pay_report(id, function(err,sch){
        if(err) throw err;
        //res.json(sch);
        var payroll = sch;
        //Rule Engine Tax Calculation
        payroll[0]["gross_pay"] = parseFloat(sch[0]["total_salary"]).toFixed(2);
        payroll[0]["total_salary"]=payroll[0]["gross_pay"];
        payroll[0]["tax"]  = ((parseFloat(payroll[0]["gross_pay"])*30)/100).toFixed(2);
        payroll[0]["take_home"]  =(parseFloat(payroll[0]["gross_pay"]) - payroll[0]["tax"]).toFixed(2)
        Employee.get_employee(id, function(err, emp){
            var schedule_id = [];
            emp._doc.schedules.forEach(ele => {
                //schedule_id.push(ele._doc._id)
                schedule_id.push(ele._id)
            });
            payroll[0]["schedules_paid"] = schedule_id
            Schedule.update_many_schedules(schedule_id, function(err, records){
                if (err) {
                    return false;
                }
            });
            emp._doc["payroll"] = payroll[0]
            Payroll.add_payroll(payroll[0])
            Employee.emp_remove_paid_schedules(id,emp._doc.schedules, function(err,erps){
                if(err) throw err;
                erps._doc["payroll"] = payroll[0]
                res.json(erps);       
            })
        });
    });
});
router.get('/old/:id', function(req, res){
    var id = req.params.id;
    Payroll.generate_employee_old_pay_report(id, function(err,pay){
        if(err) throw err;
        res.json(pay);  
    });
    // Schedule.generate_employee_old_pay_report(id, function(err,sch){
        
    // });
});
module.exports = router;