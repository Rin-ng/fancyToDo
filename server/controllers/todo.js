const Todo = require("../models/toDo")
const User = require("../models/user")
const jwt = require ("jsonwebtoken");


exports.getAll = function (req, res){
    Todo.find({createdBy:req.headers.id})
    .populate("createdBy", "name")
    .exec()
       .then(function(tasks){
           console.log(tasks[0].createdBy._id);
           res.status(201)
           .send({
               message: "Here are the lists of tasks for this user:",
               tasks
           })
       })
       .catch(function(err){
           res.status(409)
           .send({
               message: err.message
           })
       })
}

exports.addTask = function(req,res){
   let {task} = req.body;
   let createdBy = req.headers.id;
   Todo.create({
       task,
       createdBy,
   })
   .then(function(){
        Todo.find({createdBy:req.headers.id})
        .populate("createdBy", "name")
        .exec()
        .then(function(task){
            res.status(201)
            .send({
                message: "a new task has been created",
                task,
            })
        })
        .catch(function(err){
            res.status(409)
            .send({
                message:  err.message
            })
        })
   })
   .catch(function(err){
    res.status(409)
    .send({
        message: err.message
    })
})
}


exports.updateTask = function (req,res){
    let {id} = req.params;
    let newObj = {
        task: req.body.task, 
        completed: req.body.completed, 
    }

 
    Todo.findById(id)
    .populate("createdBy", "name")
    .exec()
    .then(function(task){
        task.name = newObj.task;
        task.completed = newObj.completed;
        task.updatedAt = new Date;
        task.save()
        .then(function(){
            Todo.find({createdBy: req.headers.id})
            .then(function(newTask){
                res.status(200)
                .send({
                    message: "Task information updated",
                    newTask,
                })
            })
            .catch(function(err){
                res.status(409)
                .send({
                    message: err.message
                })
            })
            
        })
        .catch(function(err){
            res.status(409)
            .send({
                message: err.message
            })
        })
    })
    .catch(function(err){
        res.status(409)
        .send({
            message: err.message
        })
    })
 
   
}

exports.deleteTask = function(req, res){
    let id = req.params.id;

    Todo.deleteOne({_id: id})
    .then(function(){
        Todo.find({createdBy:req.headers.id})
        .populate("createdBy", "name")
        .then(function(task){
            res.status(200)
            .send({
                message: "task has been deleted",
                task
            })
        })
        .catch(function(err){
            res.status(404)
            .send({
                message: err.message
            })
        })
    })

}
