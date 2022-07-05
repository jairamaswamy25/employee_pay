var {Schema,model, default: mongoose}  = require('mongoose');
var sch_schema = new Schema({
    // _id:mongoose.Schema.Types.ObjectId,
    //employee_id:Number,
    start_time:Date,
    end_time:Date,
    scheduled_hours:String,
    salary:String,
    Employee:{ type:mongoose.Schema.Types.ObjectId, ref:"Employee"},
    paid:String
})
var Schedule = module.exports = model('Schedule', sch_schema);