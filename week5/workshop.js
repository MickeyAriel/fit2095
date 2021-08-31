const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient; 

const express = require('express');
const app = express(); 

app.use(express.json());

const url = 'mongodb://10.152.168.99:68153.'

let db;
let col;

mongoClient.connect(url, {useNewUrlParser:true}, function (err,client){
    if (err){
        console.log('unable to connect');
    }
    else {
        console.log('connect success');
        db = client.db('agency'); //the name of the database

    }
})

mongoClient.connect(url,{ useNewUrlParser:true }, function (err,client){
    if (err){
        console.log('unable to connect');
    }
    else {
        console.log('connect success');
        db = client.db('fit2095s2w5'); //db name
        col = db.collection('booking'); //collection name
    }
});

app.post('/postbooking', function(req,res){
    let bookingDetails = req.body;
    console.log(bookingDetails); 
    //data in the database
    col.insertOne(bookingDetails)
    res.send('thankyou'); 
});


app.listen (8080);

