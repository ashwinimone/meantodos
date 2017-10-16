var express = require('express');
var router =  express.Router();

var mongojs = require('mongojs');
var db = mongojs('mongodb://ashwini:ashwini@ds121495.mlab.com:21495/meantodos', ['todos']);


// Get Todos
router.get('/todos', function(req, res, next){
    //get all the todos in the database
    db.todos.find(function(err, todos){
        if(err){
           res.send(err); // send error
        } else {
           res.json(todos); // get todos in json format
        }
    });
});

// Get Single Todos
router.get('/todo/:id', function(req, res, next){
    //get one the todo from the database
    db.todos.findOne({
        _id: mongojs.ObjectId(req.params.id) // attribute
    },function(err, todo){
        if(err){
           res.send(err); // send error
        } else {
           res.json(todo); // get todos in json format
        }
    });
});

// Save Todo
router.post('/todo', function(req, res, next){
    var todo = req.body; // data will come from body
    if(!todo.text || !(todo.isCompleted + '')){
        res.status(400);
        res.json({
            "error": "Invalid Data"
        });
    } else {
        db.save(todo, function(err, result){
            if(err){
                res.send(err); 
            } else {
                res.json(result);
            }
        });
    }
});

// Update Todo
// put request coz we are updating the data, use same url as long as different type of requests
router.put('/todo/:id', function(req, res, next){ 
    var todo = req.body;
    var updObj = {};
    
    if(todo.isCompleted){
       updObj.isCompleted = todo.isCompleted;
    }
    
    if(todo.text){
        updObj.text = todo.text;
    }
    
    if(!updObj){
        res.status(400);
        res.json({
            "error": "Invalid Data"
        });
    } else {
        db.todos.update({
            _id: mongojs.ObjectId(req.params.id)
        },updObj, {}, function(err, result){
            if(err){
                res.send(err); 
            } else {
                res.json(result);
            }
        });
    }
});

// Delete Todo
router.delete('/todo/:id', function(req, res, next){
    db.todos.remove({
        _id: mongojs.ObjectId(req.params.id)
    },'', function(err, result){
        if(err){
            res.send(err); 
        } else {
            res.json(result);
        }
    });
});

module.exports = router;
