const { response } = require('express');
const express = require('express'); //uses express.js as a middle ware
let url = require('url'); 

let app = express(); 

//defining the database (an array of records)
let bookDB = [];

//five attributes : id, title, author, topic,cost
let newId= Math.round(Math.random()*1000)

let rec = { //add the first record
    'id': parseInt(newId),
    'title': "rumple buttercup",
    'author': "Matthew Gubler",
    'topic': "self-love",
    'cost': parseInt(20),
}

app.get('/', function (request, response){
    response.send("Welcome to our bookstore!");
});

//List all books
app.get('/getallbooks', function (request, response){
    let resultList = generateList();
    response.send(`<h1> Book Inventory </h1> ${resultList}`);
});

//add a new book 
app.get('/addbook', function (request, response){
    var q = request.query;
    let newId= Math.round(Math.random()*1000)

    let newBook = { //new book function
        'id': parseInt(newId),
        'title': q.title,
        'author': q.author ,
        'topic': q.topic,
        'cost' :parseInt(q.cost)
    };

    console.log(newBook); // only visible to devs 

    bookDB.push(newBook); 

    response.send(`added 1 book to the database <br> <h1> Book Inventory </h1> 
    ${generateList()} <br>`); //for the clients

});

//delete a book 
app.get('/deleteid/:id', function(request, response){
    let bookIdToDelete = request.params.id;
    bookDB.splice(bookIdToDelete, 1);
    response.send(`book is deleted from the database <br> <h1> Book Inventory </h1> 
    ${generateList()} <br>`)
}); 

//get book total value URL: http://localhost:8080/getbookstorevalue
app.get('/getbookstorevalue', function(request,response){
    let totalCost = 0;
    
    for (let i = 0; i < bookDB.length; i++) {
        totalCost += bookDB[i].cost;
    }
    
    response.send(`the total value of the bookstore is ${totalCost} <br> <h1> Book Inventory </h1> 
    ${generateList()} <br>`)

});

//extra task 
app.get('/deletetopic/:topic', function(request, response){
    let bookTopicToDelete = request.params.id; 

    for (let i = 0; i < bookDB.length; i++){
        if (bookTopicToDelete === bookDB[i].topic) {
            bookDB.splice(i, 1);
            response.send (` book is deleted from the database <br> <h1> Book Inventory </h1> 
            ${generateList()} <br> `);
        } else {
            response.send( ` SORRY, COULDN'T FIND BOOK WITH SUCH TOPIC.`)
        };
    };
    
});
        

//functions
//generate the database
function generateList(){
    let  result = 'id | title | author | topic | cost <br/>'

    for (let i = 0; i < bookDB.length; i++) {
        const xBook = bookDB[i];

        result += `${xBook.id} | ${xBook.title} | ${xBook.author} | ${xBook.topic} | ${xBook.cost} <br>`;
    }

    return result; 
}

app.listen(8080, () => {
    console.log("we are listening on port 8080");
}); 

