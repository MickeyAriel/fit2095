const express = require('express');

const app = express();
const port = 8080;



app.get ('/', function (req,res){
    
    res.sendFile(__dirname + '/views/home.html')
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});

//watch the recording