const express = require ("express");
const app = express();
const mongoose = require ('mongoose');
const url = "mongodb://localhost/todo"
require('dotenv').config()



mongoose.connect(url, function(err){
    res.send(err);
})

const usersRouter = require('./routes/users');
const todoRouter = require('./routes/todo');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

const port = process.env.PORT || 3000;
app.set('port', port);


app.use('/users', usersRouter);
app.use('/todo', todoRouter);

app.get("/", function(req,res){
    console.log("activated");
})
app.listen(port);