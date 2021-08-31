const mongoose = require("mongoose"); 

const patientSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true
    },
    fullName: {
        type: String,
        required: true,
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'doctor'
    },
    age: {
        type: Number,
        min: 0,
        max: 120
    },
    date: {
        type: Date,
        default: Date.now
    },
    case: {
        type: String,
        validator: function(caseValue){
            return caseValue.length >= 10;
        },
        message: 'case should be at least 10 characters'
    }


});

module.exports = mongoose.model('patient', patientSchema);
