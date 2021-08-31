const express = require ('express');
const router = express.Router();

router.get('/student/unit', function(req, res){
    res.send('i got students unit');
});

router.get('/student*', function(req, res){
    res.send(`i got your request ${req.url}`);
});

module.exports=router; 