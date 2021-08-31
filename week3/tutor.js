const express = require('express');
const app = express(); 

//local databasse: JavaScript Array
var carsDB = [];

//add hardcoded values
var bmwX7 = {
    'name': "BMW X7",
    'model-name': "X7",
    'maker': "BMW" ,
    'year': 2021,
};

//add to the database 
carsDB.push(bmwX7);
console.log(carsDB);

app.get('/', function (request, response){
    response.send("Hello from express.JS ");
});

app.get('/cars', function (request, response){
    let resultList = generateCarsList();
    response.send(`<h1> Cars Inventory </h1> ${resultList}`);
});

app.get('/add-cars', function (request, response){
    var q = request.query;

    let newCar = { //new car() 
        'name': q.name,
        'model-name': q.model,
        'maker': q.maker ,
        'year': q.year,
    };

    console.log(newCar); // only visible to devs 

    carsDB.push(newCar); 

    response.send(`added 1 car to the database <br> <h1> Cars Inventory </h1> 
    ${resultList} <br>`);
    //for the clients
});

app.get('/delete-by-id/:carId', function(request, response){
    let carIdtoDelete = request.params.carId;

    carsDB.splice(carIdtoDelete, 1); //splice deletes item from array

    response.send(`car is deleted <br> <h1> Cars Inventory </h1> 
    ${generateCarsList} <br>`);

});


function generateCarsList(){
    let result = 'Id | Name | Maker | Model | year <br/>'

    for (let i = 0; i < carsDB.length; i++) {
        const xCar = carsDB[i];

        result += `${i} |  ${xCar.Name} | ${xCar.maker} | ${xCar.model} | ${xCar.year} <br>`;
    }

    return result; 
}

app.listen(8080); 
