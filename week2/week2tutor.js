//create first server:D 
const { fstat } = require('fs');
const http = require('http');

http.createServer(function(request, response){
    //response.end("<h1>Hello there!<h1>");
    
    console.log("page requested", request.url);
    //how to listen to different end points
    var fileName = 'error.html'
    switch (request.url) {
        case "/":
            fileName = 'home.html'
            break;
        case "/about":
            fileName = 'about.html'
            break;
        case "/assessments":
            fileName = '/assessments.html'; //this file doesnt exist yet
        default:
            break;
    }

    fs.readFile(fileName, function(error, content){
        if(error){
            fs.readFile("./404.html", function (error, content){
                response.writeHead(404, {
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

    //read file and send content back to the client
    //response.end "file name: " + fileName

}).listen();
