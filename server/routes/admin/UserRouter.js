const express = require("express");
const UserController = require("../../Controller/admin/UserController")
const UserRouter = express.Router();

UserRouter.post("/adminAPI/user/login",UserController.login)

module.exports = UserRouter;
