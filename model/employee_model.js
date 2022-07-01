var {Schema,model}  = require('mongoose');
var emp_schema = new Schema({
    // _id:Schema.Types.ObjectId,
    employee_id:Number,
    employee_first_name : String,
    employee_last_name : String,
    schedules:[{
        type:Schema.Types.ObjectId, ref:"Schedule"
    }],
    scheduled_hours : String,
    salary: String
})
var Employee = module.exports = model('Employee', emp_schema);