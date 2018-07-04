const User = require("../models/user")
const jwt = require ("jsonwebtoken");


exports.getAll = function (req, res){
    User.find({})
       .then(function(users){
           res.status(201)
           .send({
               message: "Here are the lists of users in the system:",
               users
           })
       })
       .catch(function(err){
           res.status(409)
           .send({
               message: err.message
           })
       })
}

exports.signUp = function(req,res){
   let {name, username, password} = req.body;
   User.create({
       name,
       username,
       password,
   })
   .then(function(){
        User.find({})
        .then(function(user){
            res.status(201)
            .send({
                message: "User data has been created",
                user,
            })
        })
        .catch(function(err){
            console.log("sini")
            res.status(409)
            .send({
                message:  err.message
            })
        })
   })
   .catch(function(err){
       console.log("sini?")
    res.status(409)
    .send({
        message: err.message
    })
})
}

exports.signIn = function (req, res){
    let {username, password} = req.body;
    User.findOne({username: username})
    .then(function(user){

       user.comparePassword(password, function(err, isMatch){
           if(err){
               res.status(404)
               .send({
                   message: err.message
               })
           }
           else{
               if(isMatch){
                    let token = jwt.sign({
                        id: user._id,
                    }, process.env.secretKey)

                    res.status(200).send({
                        token: token,
                        user: user
                    });
               }
               else{
                    res.status(400).send({
                        message: "Wrong Password!"
                    })
               }
           }
       });
    })
    .catch(function(err){
        res.status(404).send({
            message: "Username not found!"
        })
    })
}

exports.updateUser = function (req,res){
    let {id} = req.params;
    let newObj = {
        name: req.body.name, 
        username: req.body.username, 
        password: req.body.password,
    }

 
    User.findById(id)
    .then(function(user){
        user.name = newObj.name;
        user.username = newObj.username;
        user.password = newObj.password;
        user.updatedAt = new Date;
        user.save()
        .then(function(newUser){

            res.status(200)
            .send({
                message: "User information update",
                newUser,
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

exports.deleteUser = function(req, res){
    let id = req.params.id;

    User.deleteOne({_id: id})
    .then(function(){
        User.find({})
        .then(function(user){
            res.status(200)
            .send({
                message: "User has been deleted",
                user
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
