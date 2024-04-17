const UserModel = require("../../model/admin/UserModel")

const UserService = {
		login: async ({username, password}) => {
				return UserModel.find({
						username, password
				})
		},
		uploadInfo: async ({avatar, username, introduction, _id}) => {
				return UserModel.updateOne({_id}, {
						avatar, username, introduction
				})
		},

		manageEditor: async ({username, password, isAdmin, introduction}) => {
				return UserModel.insertMany(
						{username, password, isAdmin, introduction,}
				)
		},
		getUserList: async () => {
				return UserModel.find({});
		},
		deleteUser: async (_id) => {
				return UserModel.deleteOne({
						_id,
				});
		},
		editEditor:(userInfo) => {
				return UserModel.updateOne({_id:userInfo._id},{
						...userInfo
				})
		}
}

module.exports = UserService;
