const UserService = require("../../services/admin/UserService")
const JWT = require("../../util/JWT")

const UserController = {
		login: async (req, res) => {
				let result = await UserService.login(req.body);
				if (result.length !== 0) {
						let {_id, username} = result[0];
						let token = JWT.generate({
								_id, username
						}, "1h");
						res.header("Authorization", token);
						res.send({
								userInfo: result[0],
								status: 1,
								msg: "login success"
						})
				} else {
						res.send({
								status: 0,
								msg: "wrong password or username",
						})
				}
		},

		uploadInfo: async (req, res) => {
				console.log(req.file.filename, req.body);
				let {username, introduction, _id} = req.body;
				let result = await UserService.uploadInfo({
						avatar: req.file.filename,
						username,
						introduction,
						_id,
				});
				if (result.modifiedCount) {
						res.send({
								ok: 1,
								msg: "Upload Info succeed",
						})
				} else {
						res.send({
								ok: 0,
								msg: "Upload info failed"
						})
				}
		},

		manageEditor: async (req, res) => {
				let result = await UserService.manageEditor(req.body);
				if (result.length > 0) {
						res.send({
								ok: 1,
								msg: "Insert success!"
						})
				} else {
						res.send({
								ok: 0,
								msg: "Insert fail!"
						})
				}
		},
		getUserList: async (req, res) => {
				let result = await UserService.getUserList();
				console.log(result);
				res.send({
						ok: 1,
						data: result,
				})
		},
		deleteUser: async (req, res) => {
				let result = await UserService.deleteUser(req.body._id);
				if (result.deleteCount !== 0) {
						res.send({
								ok: 1,
								msg: "delete success",
						})
				}
		},
		editEditor:async (req,res) => {
				let result = await UserService.editEditor(req.body);
				console.log(result)
				if(result.modifiedCount!==0) {
						res.send({
								ok:1,
								msg:"Update info success"
						})
				}
				else {
						res.send({
								ok:0,
								msg:"Update info fail"
						})
				}
		}
}

module.exports = UserController;
