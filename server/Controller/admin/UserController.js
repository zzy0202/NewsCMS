const UserService = require("../../services/admin/UserService")

const UserController = {
		login:async (req,res)=>{
				let result =await UserService.login(req.body);
				if(result.length!==0) {
						res.send({
								status:1,
								msg:"login success"
						})
				}
				else {
						res.send({
								status:0,
								msg:"wrong password or username",
						})
				}
		}
}

module.exports = UserController;
