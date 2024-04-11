const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let UserType = {
		username:String,
		password:String,
		introduction:String,
		isAdmin:Number,
		avatar:String,
}

const UserModel = mongoose.model("user",new Schema(UserType));

module.exports = UserModel;
