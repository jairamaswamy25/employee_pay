var mongoose = require('mongoose');
var Employee = require('../model/employee_model')
var Schedule = require('../model/schedule_model')

module.exports.get_employees = function(callback){
    Employee.find(callback).populate('schedules');
}
module.exports.add_employee = function(new_employee, callback){
    Employee.create(new_employee, callback);
}
module.exports.update_employee = function(id, new_employee, callback){
    Employee.findByIdAndUpdate(id, new_employee, callback);
}
module.exports.delete_employee = function(id, callback){
    Employee.findByIdAndRemove(id, callback);
}
module.exports.get_employee = function(id, callback){
    Employee.findById(id, callback).populate('schedules');
}
module.exports.get_employee_without_ref = function(id, callback){
    Employee.findById(id, callback);
}
module.exports.update_emp_sch_by_id=function(id,sche,callback){
    Employee.findById(id, function (err, emp) {
        if (err) console.log(err);
        console.log(emp)
        emp._doc.schedules.push(sche._doc)
        emp.save();
        callback(err,emp);
      });
}
module.exports.find_max_employee_id = function(callback){
    Employee.find(callback).sort({employee_id:-1}).limit(1);
}
module.exports.search_employee = function(key_word,callback){
    Employee.find({employee_first_name: key_word} || {employee_last_name: nameRegex},callback)
    //Employee.find(callback).sort({employee_id:-1}).limit(1);
    // isNaN(key_word)?Employee.find({employee_first_name: key_word} || {employee_last_name: nameRegex},callback)
    // :Employee.find({ employee_id: parseInt(key_word) },callback)
    
}
module.exports.employee_collection =function(id, callback){
    Employee.findById(id,callback).populate('schedule')
     .exec((err, emp) =>{
        if(err){
           console.log(err);
        }
        else{
            return emp.schedule;
        }
     });
}
module.exports.emp_remove_paid_schedules=function(id,sche,callback){
    Employee.findById(id,function (err, emp) {
        if (err) console.log(err);
        console.log(emp); 
        sche.forEach(ele => {
            emp._doc.schedules.pop(ele._doc._id)  
        });
        emp.save();
        callback(err,emp);
      });

    }