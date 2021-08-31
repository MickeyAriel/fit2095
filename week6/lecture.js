const express = require ('express');
const app = express();
const mongoose = require('mongoose');
const path = require("path");

//connect to db with url 
const url = "mongodb://localhost:27017/week6lecture"; 

const print = console.log;
const User = require("./models/users"); //so user is the model

app.get('/', function (req,res){
    res.sendFile(path.join(__dirname, "views", "index.html")) //connect to ur html
});

app.post("/userpost", function (req,res){
    let newUserObj = req.body;

    let aUser = new User({
        name: newUserObj.name,
        age: newUserObj.age //if you put -20 validation failed
    });

    aUser.save(function(err){
        if (err){
             print(err);
            return;
        }
        res.send("saved successfully");
    });
});

mongoose.connect(url,function(err){
    if(err){
        print(err);
        return;
    }
    print("successfully connected"); 
});

// let aUser = new User({
//     // _id:  mongoose.Types.ObjectId(),
//     name: "James",
//     age: 20 //if you put -20 validation failed
// });

// aUser.save(function(err){
//     if (err){
//         print(err);
//         return;
//     }
//     print("saved successfully");
// });

app.listen(8080); 