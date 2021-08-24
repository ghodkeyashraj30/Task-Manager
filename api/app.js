const express = require('express');
const { mongoose} = require('./db/mongoose');
const app = express();

const bodyParser = require('body-parser');

//Load in the mongoose model
const { List, Task } = require('./db/models');


//Load middleware
app.use(bodyParser.json());

//CORS HEADERS MIDDLEWARE
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");    
    next();
  });

/* ROUTE HANDLERS*/

/* LIST ROUTES */

/* 
Get /lists
purpose: get all lists
*/
app.get('/lists', (req, res)=>{
    //we want to return array of the all lists in the database
    List.find({}).then((lists)=>{
        res.send(lists);
    });
})

/* 
Post /lists
purpose: create a list
*/
app.post('/lists', (req, res)=>{
    //we want to create a new list and return the new list document back to the user (which includes the id)
    //the list information passed in via JSON request body
    let title = req.body.title;

    let newList = new List({
        title
    });
    newList.save().then((listDoc)=>{
        //the full list document is returned (including id)
        res.send(listDoc);
    })
}); 

/* PATH /lists/:id
 purpose: update a specified list
*/ 
app.patch('/lists/:id',(req,res)=>{
 //we want to update the specified lists (list document with the id in the url) with new values specified in the JSON body
 List.findOneAndUpdate({_id: req.params.id}, {
     $set: req.body
 }).then(()=>{
     res.send({message: "Updated Successfully"})
 });
});

app.delete('/lists/:id',(req,res)=>{
  //we want to delete the specified (doument with id in the url)
  List.findOneAndRemove({
      _id: req.params.id
  }).then((removedListDoc)=>{
      res.send(removedListDoc);
  })
});

/*
GET /lists/:listId/tasks
purpose: get all task in specific list
*/
app.get('/lists/:listId/tasks',(req,res)=>{
    //we want to return all task that belong to a specific list(specified by listId)
    Task.find({
        _listId: req.params.listId
    }).then((tasks)=>{
        res.send(tasks);
    })
});

//To find one specific task by task id
/*
app.get('/lists/:listId/tasks/:taskId',(req,res)=>{
    Task.findOne({
        _id: req.params.taskId,
        _listId: req.params.listId
    }).then((task)=>{
        res.send(task);
    })
})
*/

/*Post /lists/:listId/Tasks
purpose: create a new task in specific list by listId
*/
app.post('/lists/:listId/tasks',(req,res)=>{
    //we want to create a new task in a list specified by listId
    let newTask = new Task({
        title: req.body.title,
        _listId: req.params.listId
    });
    newTask.save().then((newTaskDoc)=>{
        res.send(newTaskDoc);
    })
})

/*
PATCH /lists/:listId/tasks/:taskId
purpose: Update an existing task
*/
app.patch('/lists/:listId/tasks/:taskId',(req,res)=>{
    //we want to update an existing task(specifid by taskid)
    Task.findOneAndUpdate({
        _id: req.params.taskId,
        _listId: req.params.listId
    },{
        $set: req.body
    }).then(()=>{
        res.send({message: "Updated Successfully"})
    })
});


/*
DELETE /lists/listId:/tasks/:taskId
Purpose: DELETE a task
*/
app.delete('/lists/:listId/tasks/:taskId',(req,res)=>{
    Task.findOneAndRemove({
        _id: req.params.taskId,
        _listId: req.params.listId
    }).then((removedTaskDoc)=>{
        res.send(removedTaskDoc);
    })
});

app.listen(3000, () =>{
    console.log('Server is listening on port 3000');
})