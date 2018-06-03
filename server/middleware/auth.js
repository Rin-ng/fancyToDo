const User = require("../models/user");
const Todo = require("../models/toDo");
const jwt = require ("jsonwebtoken");

function auth(req,res,next){
    let {id} = req.params;
    let {token} = req.headers;
    
    if (token) {
        try {
            let decoded = jwt.verify(token, process.env.secretKey)
            if (decoded) {
                Todo.find({createdBy: decoded.id})
                .then((tasks) => {
                    console.log(id);
                    let flag = false;
                    tasks.forEach(function(task){
            
                        if(String(task._id) === id){
                            flag = true;
                        }
                    })
                    if(flag === true){
                        next();
                    }
                    else{
                        res.status(403).send({
                            message: "NOT AUTHORIZED TO ACCESS! 😡"
                        })
                    }
                    flag = true;
                })
                .catch((err) => {
                    console.log(err)
                })
            } 
        } catch(err) {
            res.status(404).send({
                message: "Invalid token"
            })
        }
    } else {
        res.send('login dlu');
    }
}

module.exports = auth;