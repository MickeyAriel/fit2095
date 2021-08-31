//lab week 2
const fs = require('fs');
const http = require('http');

http.createServer(function (request, response){ //turns your computer to http server, requires a callback method
    console.log("page requested", request.url);

    var fileName = 'week2/error.html'
    switch (request.url) {
        case "/":
            fileName = 'week2/home.html' //home page
            break;
        case "/week2/assessment.html": //assessment page, display 4 assessments in this unit
            fileName = 'week2/assessment.html' 
            break;
        case "/week2/topics.html": //display the week 12 topics
            fileName = 'week2/topics.html'
            break;
        case "/week2/contactus.html": //contact us page
            fileName = 'week2/contactus.html'
            break;               
        default:
            break;
    }

    fs.readFile(fileName, function(error, content){ //work with the file system
        if(error){
            fs.readFile("./404.html", function (error, content){ //asynchronously reads the file
                response.writeHead(404, { // the status code, 200 = ok , 404 = error
                    "content-type": "text.html",
                });
                response.end(content, "utf-8");
            });
        } else{
            response.writeHead(200, {
                "content-type": "text.html",
            });
            response.end(content, "utf-8");
        }
        
    });
    function getDaysDiff(d, m, y) {
        let returnValue = -1;
        let currentDay = new Date();
        currentDay.setDate(parseInt(d));
        currentDay.setMonth(parseInt(m) - 1); // months start from 0
        currentDay.setYear(parseInt(y));
        let firstDay = new Date("8/3/2020"); // first day in semester 2
        if (currentDay >= firstDay) {
            var diffDays = parseInt((currentDay - firstDay) / (1000 * 60 * 60 * 24)); //gives day difference 
            returnValue = (Math.floor(diffDays / 7) + 1);
        }
        return (returnValue);
    }

}).listen(8080); //serves clients requests on port 8080
