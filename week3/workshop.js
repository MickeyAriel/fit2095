// number 1
const express = require('express'); 

let app = express(); 
let log = console.log;
let db = [];

app.get('/week3*', function(req,res){ 
    res.send('welcome to week 3');
});

app.listen(8080, () => {
    console.log("we are listening on port 8080");
});

//number2
const express = require('express'); 

let app = express(); 
let log = console.log;
let db = []; 

app.get('/student/marks', function(req,res) {
    console.log(req.query);
    let newMarkObj = {
        'prerq': parseInt(req.query.prerq),
        'wsq': parseInt(req.query.wsq),
        'lab': parseInt(req.query.lab),
    };

    db.push(newMarkObj);
    weekMark = ((prerq * 0.1) +(wsq*0.1) + (lab*0.2)); 

    res.send(`week 3 mark is ${weekMark}`);
});

/* number 3 
route parameters are named URL segments that are used to get the values at 
their position in the URL which is populated by the req.params object 
e.g. req.params: { "userId": "34", "bookId": "8989" }

query string is a part of the URL segments that assigns the values to specified parameters
which uses req.query tog et the list of the query string parameters 
e.g. req.query.name or req.query.age and their query string would be after the ? symbol
e.g. http://student/?name=John&age=16


*/
