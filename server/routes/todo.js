var express = require('express');
var router = express.Router();

const auth = require("../middleware/auth")

const todoController = require ('../controllers/todo');

router
    .get("/", todoController.getAll)
    .post("/", todoController.addTask)
    .put("/:id", auth, todoController.updateTask)
    .delete("/:id", auth, todoController.deleteTask);

module.exports = router;