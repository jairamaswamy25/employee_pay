var {Schema,model}  = require('mongoose');
var payroll_schema = new Schema({
    // _id:Schema.Types.ObjectId,
    total_salary:String,
    Employee:{ type:Schema.Types.ObjectId, ref:"Employee"},
    gross_pay : String,
    tax : String,
    take_home: String,
    schedules_paid:[{
        type:Schema.Types.ObjectId, ref:"Schedule"
    }]   
})
var Payroll = module.exports = model('Payroll', payroll_schema);

// "total_salary": "120.00",
//         "Employee": "62bd11795e7da966144b8b09",
//         "gross_pay": "120.00",
//         "tax": "36.00",
//         "take_home": "84.00",
//         "schedules_paid": [
//             "62bdbf40228060f6e0985275",
//             "62bdbf59228060f6e0985279"
//         ]