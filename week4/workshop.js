//q1

function unitCode (req,res,next){
    req.unitCode = 'FIT2095';
    next();
};

function weekNumber (req,res,next){
    req.weekNumber = '4';
}

app.use(unitCode); 
app.use(weekNumber);


/* q2 
action specifies the address that the form is submitted to using the method 
that is stated after the action in <form action="/data" method="POST">

method is an attribute that speciies how to send the form-data to the  page specified in the action attribute
a method could be GET or POST
 */

//q3 
// Extracts value1 and value2 from the POST 
//request that is sent by index.html on pathname=‘/findmax’

const express = require("express");
const app = express();

// your code goes here

function max(){ //answer
    if (value1 > value2){
        max = value1;
    }
    else {
        max = value2;
    }
};

app.use(function (req, res, next) {
    req.unitCode = "FIT2095";
    req.weekNumber = 4;
    next();
});
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

//your code here
app.post('/findmax', function(req,res){
    let value1 = parseInt(req.body.value1);
    let value2 = parseInt(req.body.value2);

    console.log(`value 1 = ${value1} and value 2 = ${value2}`);
});


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

// your code here

let maxValue = parseInt(max); 
res.render('response.html', {maxValue});

app.listen(8080);

