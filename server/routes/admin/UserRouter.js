const express = require("express");
const UserController = require("../../controller/admin/UserController")
const UserRouter = express.Router();
const multer = require('multer')
const upload = multer({
		dest: 'public/uploads/',
		filename:""
		}
)

UserRouter.post("/adminAPI/user/login", UserController.login)
UserRouter.post("/adminAPI/user/uploadInfo", upload.single('file'), UserController.uploadInfo)

module.exports = UserRouter;
