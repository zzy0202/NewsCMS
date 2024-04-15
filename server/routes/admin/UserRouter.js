const express = require("express");
const UserController = require("../../controller/admin/UserController")
const UserRouter = express.Router();

UserRouter.post("/adminAPI/user/login",UserController.login)
UserRouter.get("/adminAPI/user/home",(req, res)=>{
		res.send({
				ok:1,
		})
})
module.exports = UserRouter;
