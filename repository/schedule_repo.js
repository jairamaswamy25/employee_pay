var mongoose = require('mongoose');
var Schedule = require('../model/schedule_model')

module.exports.get_schedules = function(callback){
    Schedule.find(callback);
}
module.exports.add_schedule = function(new_schedule, callback){
    Schedule.create(new_schedule, callback);
}
module.exports.update_schedule = function(id, new_schedule, callback){
    Schedule.findByIdAndUpdate(id, new_schedule, callback);
}
module.exports.update_many_schedules = function(schedule_ids, callback){
    Schedule.updateMany({_id: {$in: schedule_ids}},{ $set: {paid: "Yes"}},{multi: true},callback);
}
module.exports.delete_schedule = function(id, callback){
    Schedule.findByIdAndRemove(id, callback);
}
module.exports.get_schedule = function(id, callback){
    Schedule.findById(id, callback);
}
module.exports.generate_employee_pay_report = function(id,callback){
    // Employee.findById(id).populate('schedules')
    // Employee.aggregate
    Schedule.aggregate([
        { $match: { Employee: mongoose.Types.ObjectId(id)}},
    {$group: {_id: '$Employee', total_salary:{$sum:{"$toDouble": "$salary"} }}},
    {$project:{Employee:'$_id', total_salary:1,_id:0}}
    ],callback)   
}