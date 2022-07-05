var mongoose = require('mongoose');
var Payroll = require('../model/payroll_model')

module.exports.get_payrolls = function(callback){
    Payroll.find(callback).populate('schedules_paid');
}
module.exports.add_payroll = function(new_payroll, callback){
    Payroll.create(new_payroll, callback);
}
module.exports.get_payroll = function(id, callback){
    Payroll.findById(id, callback).populate('schedules_paid');
}
module.exports.update_payroll = function(id, new_payroll, callback){
    Payroll.findByIdAndUpdate(id, new_payroll, callback);
}
module.exports.delete_payroll = function(id, callback){
    Payroll.findByIdAndRemove(id, callback);
}
module.exports.generate_employee_old_pay_report = function(id,callback){
    Payroll.find({"Employee":id},callback).populate(['Employee','schedules_paid']);
}