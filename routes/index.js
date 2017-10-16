var express = require('express');
//create router
var router =  express.Router();

// get request
router.get('/', function(req, res, next){
    res.render('index.html');
});

//export so that other files can use it
module.exports = router;
