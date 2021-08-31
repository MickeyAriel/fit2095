let http = require ('http');
let url = require('url');
http.createServer(function (req, res){
    console.log("URL=" + req.url);
    res.writeHead(200, {
        "content-type": "text/html"
    });
    var baseURL = "http://" + req.headers.host + "/";
    var url = new URL(req.url, baseURL);
    let params = url.searchParams;
    console.log(params);
    let msg = "year: " + params.get("year") + " Month: " + params.get("month") +
        " Day: " + params.get("day");
    res.end(msg);

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
}).listen();