const UserModel = require("../../model/admin/UserModel")

const UserService = {
		login: async ({username, password}) => {
				return UserModel.find({
						username, password
				})
		},
		uploadInfo: async ({avatar,username,introduction,_id}) => {
				return UserModel.updateOne({_id},{
						avatar,username,introduction
				})
		}
}

module.exports = UserService;
