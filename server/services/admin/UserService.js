const UserModel = require("../../model/admin/UserModel")

const UserService = {
		login:async ({username, password})=>{
				console.log(username,password);
				return UserModel.find({
						username,password
				})
		}
}

module.exports = UserService;
