const { response } = require('express');
const express = require('express');
const morgan = require('morgan');

const app = express();
const port = 8080;

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

//setup the static assets directories
app.use(express.static('images')); //to serve static css and img
app.use(express.static('css'));

app.use(morgan('tiny'));
app.use(express.urlencoded({extended: true}));
app.use(express.json()); 

//defining database
let db = []; 

//five attributes : id, title, author, topic,cost
let newId= Math.round(Math.random()*1000)

//homepage
app.get('/', function (req,res){
    res.sendFile(__dirname + '/views/home.html')
});

//user add a new book 
app.get('/newbook', function (req,res){
    res.sendFile(__dirname + '/views/newbook.html')
});

//post result 
app.post('/newbook', function(req, res){
    //validation
    if ((req.body.title).length < 3 || (req.body.author).length < 3 || (req.body.topic).length < 3) {
        res.sendFile(__dirname + '/views/invalid.html')

    } 
    else {    title = console.log(req.body.title);
        author = console.log(req.body.author);
        topic = console.log(req.body.topic);
        cost = parseInt(console.log(req.body.cost));
    
        //push into db 
        db.push({
            Title: req.body.title,
            Author: req.body.author,
            Topic: req.body.topic,
            Cost: req.body.cost
        });
    
        console.log(db);
    
        res.send('Thankyou! Please go back to our homepage')}
});

//user get list of book
app.get('/listbook', function (req,res){
    res.sendFile(__dirname + '/views/listbook.html')
    res.render("listofbooks", {books:db});
    
});

//extratask 
app.get('/searchbyauthor', function (request,res){
    let bookAuthor = request.params.name;
    for (let i = 0; i < db.length; i++){
        if (bookAuthor === db[i].author){
            res.sendFile(__dirname + '/views/searchbyauthor.html')
        } else { 
            res.send (`sorry couldn't find a record that contains that author `)
        };
    };
        
    res.sendFile(__dirname + '/views/searchbyauthor.html')
});


//404 error html 
app.use (function(req,res,next){
    res.status(404);
    //respond with error page
    if(req.accepts('html')){
        res.sendFile(__dirname + '/views/404.html')
        return;
    }
});






app.listen(port, () => {
    console.log(`listening on port ${port}`);
});




//fix list book

