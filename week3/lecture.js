//familiarity
const express = require('express'); 

let app = express(); 
function homeHandler(req, res){
    res.send("welcome to FIT2095");
}



app.get('/', homeHandler);

app.get('/student', function(req,res) {
    res.send("you requested students details");
});

app.get('/student/report', function(req,res) {
    res.send("here is the report of students");
});

app.get('/teacher', function(req,res) {
    res.send("you requested teachers details");
});

app.get('/teacher/report', function(req,res) {
    res.send("here is the report of teachers");
});




app.listen(8080, () => {
    console.log("we are listening on port 8080");
}); 




//query string
const express = require('express'); 

let app = express(); 
let log = console.log;

//http://localhost:8080/student/?name="john"&age=20&address=Melbourne

app.get('/student', function(req,res) {
    console.log(req.query);
    res.send(`Thank you ${req.query.name} , you live in ${req.query.address}`);
});

//http://localhost:8080/teachers/Steff/25/Mel (for flexibility)
app.get("/teacher/:name/:age/:address", function(req,res){
    log(req.params); //user cant input another query except for name age and address (for rejection)
    log(req.query); //so that user can input query from browser
    res.send("Thank you!")
});

 //without address
 app.get("/teacher/:name/:age/:address", function(req,res){
    log('without address'); 
    log(req.params); 
    res.send("Thank you!")
});

app.listen(8080, () => {
    console.log("we are listening on port 8080");
}); 

//with database
const express = require('express'); 

let app = express(); 
let log = console.log;
let db = []; //database

app.get('/student/add', function(req,res) {
    console.log(req.query);
    let newStudentObj = {
        'name': req.query.name,
        'age': parseInt(req.qquery.age),
        'address': req.query.address,
    };

    db.push(newStudentObj);
    res.send(`Thank you, you have been added`);
});

//ask for age, get the name
app.get('student/age/:nameParam', function(req,res){
    db.forEach((student,index) => {
        if(student.name === req.params.nameParam){
            res.send(` the age of ${req.params.nameParam} is ${student.age}`);
            return;
        }
    });
    res.send(`sorry i cant find such student ${req.params.nameParam}`);
});

//ask for address, get the name
app.get("/student/address/:name", function(req,res){  //if get the address, use :address
    db.forEach((student,index)=>{

    });
});

app.get('/student(application)', function(req,res){ //application is optional
    // student*application = u must have both prefixes
    //student$ = anything that includes student
    res.send(`i got your request ${req.url}`);
});


app.listen(8080, () => {
    console.log("we are listening on port 8080");
});



