const express = require('express');
const app = express();
const morgan = require("morgan");
const print = console.log;

app.set('port', 8080);

//sending data through the backend to be saved to DB
app.use(express.json()); 
app.use(express.urlencoded({extended:true}));

app.engine('html',require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/',function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post('/adduser', function(req,res){
    print(req.body); //print= console.log
    let age = parseInt(req.body.age);
    res.render("response.html", {anAge:age}); //rendering engine
});


// APP.USE FUNCTION 
function addTS(req,res,next){
    req.week4Timestamp = new Date().toISOString();
    next(); //next is a function which has to be called or else the app will always wait
}

app.use(addTS);
    //console.log('hi from middleware');
app.use(morgan("tiny")); 


app.get('/',function(req,res) {
    //console.log('hi from GET handler');
    console.log(`the TS for this request is ${req.week4Timestamp}`)
    res.send('Welcome to week4 ' + req.week4Timestamp);
}); 
    



app.listen(app.get('port'),() => {
    console.log (`we are listening on port ${app.get('port')}`);
}); //we are listening on port 8080 



/* NOTES
query string : req.query
parameters: req.params
post: req.body 

*/

{/* <html>
    <body>
        <form method ="POST" action= "/adduser"> 
            TITLE <input type = "text" name = "TITLE"/> <br><br>
            AUTHOR <input type = "text" name = "AUTHOR"/> <br><br>
            TOPIC <input type = "text" name = "TOPIC"/> <br><br>
            COST <input type = "text" name = "COST"/> <br><br>
            <br>
            <button type ="submit"> SEND DATA </button>
        </form>
    </body>
</html> */}

// console.log(req.body.title);
//     console.log(req.body.author);
//     console.log(req.body.topic);
//     console.log(req.body.cost);
//     res.send('Thankyou :)')