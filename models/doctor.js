const mongoose = require("mongoose"); 

const doctorSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String
    },
    dob:{
        type: Date
    },
    state:{
        type: String,
        validator: function(stateValue){
            return stateValue.length >= 2 && stateValue.length <= 3;
        },
        message: 'state should be 2/3 characters'
    },
    suburb: {
        type: String
    },
    street: {
        type: String
    },
    unit: {
        type: String
    },
    numPatients: {
        type: Number,
        min: 0,
    }
});

module.exports = mongoose.model('Doctor', doctorSchema);
