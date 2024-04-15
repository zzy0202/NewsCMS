const UserService = require("../../services/admin/UserService")
const JWT = require("../../util/JWT")

const UserController = {
		login:async (req,res)=>{
				let result =await UserService.login(req.body);
				if(result.length!==0) {
						let {_id,username} = result[0];
						let token = JWT.generate({
								_id,username
						},"1h");
						res.header("Authorization",token);
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
