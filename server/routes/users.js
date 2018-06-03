var express = require('express');
var router = express.Router();

const userController = require ('../controllers/users');

router
    .get("/", userController.getAll)
    .post("/signup", userController.signUp)
    .post("/signin", userController.signIn)
    .put("/:id", userController.updateUser)
    .delete("/:id", userController.deleteUser);

module.exports = router;