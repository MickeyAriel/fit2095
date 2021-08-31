const mongoose = require("mongoose");

//mongoose is for validation like this 
const carSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true
    },
    make : String, 
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

});

module.exports = mongoose.model("Car", carSchema);