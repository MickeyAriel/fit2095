const mongoose = require("mongoose");

//mongoose is for validation like this 
const userSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true
    },
    name: {type: String,
        required:true,
        // set: function(aName){ //setter
        //     return "Prof. " + aName;
        // },
        // get: function(aName){ //getter
            
        // }
    },
    age:{type: Number,
        validate: {
            validator: function (value) {
                return value >= 15 && value <=100;
            },
            message: 'age must be 15 and 100 '
        }
    },

   
});

module.exports = mongoose.model("User", userSchema ); //user is the collection name in mongo db


