const mongodb = require("mongodb");

const mongoClient = mongodb.MongoClient; 

const express = require('express');
const app = express();

app.set('PORT', 8080);
app.use(express.json());

//https://www.aserver.com:9876

const url = "mongodb://localhost:27017";

let db;
let col;

mongoClient.connect(url,{ useNewUrlParser:true }, function (err,client){
    if (err){
        console.log('unable to connect');
    }
    else {
        console.log('connect success');
        db = client.db('fit2095s2w5'); //db name
        col = db.collection("students");
        // db.collection("students").insertOne({ firstName : "Anna", year: 1997}); //collection or table name
    }
});

app.post('/adduser', function(req,res){
    let userDetails = req.body;
    console.log(userDetails);
    // data in database
    col.insertOne(userDetails);

    res.send('thank you');
});

app.get("/getusers", function(req,res){
    col.findOne({name:'Tim'}.toArray(function(err,data){
        res.send(data);
    }));
});

app.delete('/deluser', function(req,res){
    let userName = req.body.name;
    col.deleteOne({name: userName}, function(err,obj){
        res.send(obj);
    });
});





app.listen(app.get('PORT'), () => {
    console.log('listening on port 8080')
});

