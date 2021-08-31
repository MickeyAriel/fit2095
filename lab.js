//application that is responsible for managing a clinic and its patients.

const express = require ('express');
const mongodb = require('mongodb'); 
const morgan = require('morgan'); 
const mongoose = require('mongoose'); //mongoose

const app = express(); 
const PORT = 8080; 

//express should be able to render ejs template
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html'); 

//setup the static assets directories
app.use(express.static('images')); //to serve static css and img
app.use(express.static('css'));

app.use(morgan('tiny'));

//parse application url and json
app.use(express.urlencoded({extended: true}));
app.use(express.json()); 

//establish connection with mongodb
const MongoClient = mongodb.MongoClient; 

const doctors = require('./models/doctor');
const patients = require('./models/patient');
const doctor = require('./models/doctor');

let url = 'mongodb://localhost:27017/clinicDB'

let db, doctorsCollection, patientsCollection;

MongoClient.connect(url, {useNewUrlParser:true}, function (err,client){
    if(err){
        console.log('unable to connect');
    }
    else {
        console.log('connect success')
        db = client.db('clinicDB');
        doctorsCollection = db.collection('doctors')
        patientsCollection = db.collection('patients')
    }
});

//connect to mongoose
mongoose.connect(url,function(err){
    if(err){
        console.log(err);
        return;
    }
    else{
    console.log("successfully connected"); 
    };
});

/*________________________________________________________________________*/

//homepage
app.get('/', function(req,res){
    console.log('user requested homepage');
    res.render('home.html')
});

//insert a new Doctor: adds a new doctor to ‘doctors’ collection
app.get('/adddoctor', function(req,res){
    console.log('user requested to add doctor');
    res.render('adddoctor.html')
});

app.post('/adddoctor', function (req,res){
    console.log(req.body);
    //add to database
    let newDoctor = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dob: req.body.dob,
        stateValue: req.body.state,
        suburb: req.body.suburb,
        street: req.body.street,
        unit: req.body.unit,
        numPatients: req.body.numPatients,
        };
    //insert to database
    doctors.insertMany(newDoctor);
    //direct ot the list of record
    res.redirect('/listdoctor');
});

//insert new patient 
app.get('/addpatient', function(req,res){
    console.log('user requested to add patient');
    res.render('addpatient.html')
});

app.post('/addpatient', function (req,res){
    console.log(req.body);
    //add to database
    let newPatient = {
        fullName: req.body.fullName,
        doctor: req.body.doctor,
        age: req.body.age,
        date: req.body.date,
        case: req.body.case
        };

        //insert to database
        patients.insertMany(newPatient);
        //direct ot the list of record
        res.redirect('/listpatients');

        //find doctor first name 
        let findDoctorById = req.body.doctor;
        for (let i = 0; i < doctor.length; i++) {
            if (findDoctorById = doctor[i]._id){
                patients.insertMany(doctor.firstName);
            } 
            else{
                console.log('no id');
            }
        }
       
        //increment doctor patient number by 1 
        let doctorIdFilter = req.body.doctor;
        let filterDoctorById = {doctorIdFilter}
        let theUpdatedPatients = {
            $inc:{
                numPatients: 1
            }
        }
        doctorsCollection.updateOne(filterDoctorById, theUpdatedPatients)
        
});

//delete patient by full name
app.get('/deletepatient', function(req,res){
    console.log('user requested to delete patient');
    res.render('deletepatient.html');
});

app.post('/deletepatient', function (req,res){
    let patientDetails = req.body;
    let filter = {fullName: patientDetails.deleteFullName}
    console.log(filter);
    patientsCollection.deleteMany(filter);

    patientsCollection.find({}).toArray(function(err,result){
        res.render("listpatients.html",{
            patientsCollection: result
        });
    });
});

//update doctor's patient by id
app.get('/updatedoctor', function(req,res){
    console.log('user requested to update a doctor');
    res.render('updatedoctor.html');
});

app.post('/updatedoctor', function(req,res){
    const Doctor  = mongoose.model('Doctor');
    let doctor = req.body;
    let filter = {_id: doctor.doctorUpdate};
    let theUpdate = {
        $set:{
            numPatients: doctor.numPatientsNew
        }
    };
    console.log(theUpdate);
    
    Doctor.updateOne(filter, theUpdate);
    doctorsCollection.find({}).toArray(function(err,result){
        res.render("listdoctor.html",{
            doctorsCollection: result
        });
    });
});

//get all patients page
app.get('/listpatients',function(req,res){
    //read from db
    patientsCollection.find({}).toArray(function(err,result){
        res.render("listpatients.html",{
            patientsCollection:result
        });
    });
});

//get all doctors page
app.get('/listdoctor', function(req,res){
    //read from db
    doctorsCollection.find({}).toArray(function(err,result){
        res.render("listdoctor.html",{
            doctorsCollection: result
        });
    });
});

//404 error html
app.use(function(req,res,next){
    res.status(404);
    //respond with error page
    if (req.accepts('html')){
        res.sendFile(__dirname + '/views/404.html');
    }
});

//conenct to port
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});

//fix update doctor
//fix increment
//show first and last name of doctor in list patients
// fix so that ur mongoose works
//deploy app to VM in GCP



