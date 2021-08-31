const e = require('express');
const express = require ('express');
const mongodb = require('mongodb'); 
const morgan = require('morgan'); 

const app = express(); 
const PORT = 8080; 

//express should be able to render ejs template
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html'); 

//setup the static assets directories
app.use(express.static('images')); //to serve static css and img
app.use(express.static('css'));

app.use(morgan('tiny'));
app.use(express.urlencoded({extended: true}));
app.use(express.json()); 

//establish connection with mongodb
const MongoClient = mongodb.MongoClient; 

//url
const url = 'mongodb://localhost:27017/'; 

let db, labw5Collection;

//connect app to mongodb 
MongoClient.connect(url, {useNewUrlParser: true}, function (err,client){
    if (err){
        console.log('unable to connect');
    }
    else {
        console.log('connect success');
        db = client.db('fit2095');

        labw5Collection = db.collection('labw5')
    };
});

//homepage
app.get('/', function(req,res){
    res.sendFile(__dirname + '/views/home.html')
});

//add new book
app.get('/addbook', function(req,res){
    res.sendFile(__dirname + '/views/addbook.html')
});

app.post('/addbook', function (req,res){
    console.log(req.body);
    //add to the database
    let newBook = {
        title : req.body.title,
        author : req.body.author,
        topic: req.body.topic,
        date: req.body.date,
        summary: req.body.summary
    };
    //insert to mongodb 
    labw5Collection.insertOne(newBook);

    //direct ot the list of record
    res.redirect('/listbook');
});


//delete a book by topic inputted 
app.get('/deletebook', function(req,res){
    res.sendFile(__dirname + '/views/deletebook.html')
});

app.post('/deletebook', function (req,res){
    let bookDetails = req.body; 
    let filter = {topic: bookDetails.topicdelete}
    console.log(filter);
    labw5Collection.deleteMany(filter);
    res.redirect('/listbook');
});

//extra task: delete book by date
app.get('/deletebookdate', function(req,res){
    res.sendFile(__dirname + '/views/deletebookdate.html')
});

app.post('/deletebookdate', function (req,res){
    let bookDetails = req.body; 
    let filter = {date:{$lt:bookDetails.datedelete}};
    console.log(filter);
    labw5Collection.deleteMany(filter);
    res.redirect('/listbook');
});



//update a book 
app.get('/updatebook', function(req,res){
    res.sendFile(__dirname + '/views/updatebook.html')
});

app.post('/updatebook', function (req,res){
    let book = req.body;
    let filter = {title: book.titleold};
    let theUpdate = {
        $set:{
            author : book.authornew,
            topic : book.topicnew,
            date : book.datenew,
            summary : book.summarynew
        }
    };
    labw5Collection.updateOne(filter, theUpdate);
    res.redirect('/listbook');
});

//get all books 
app.get('/listbook', function (req,res){
    //read from database 
    labw5Collection.find({}).toArray(function(err, result){
        res.render("listbook.html", {
            labw5Collection : result
        });
    });

});


app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});

//fix update






