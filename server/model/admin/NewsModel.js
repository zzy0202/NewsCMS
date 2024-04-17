const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let NewsType = {
		title:String,
		newsContent:String,
		date:String,
		newsCover:String,
		newsType:String,
}

const NewsModel = mongoose.model("news",new Schema(NewsType));

module.exports = NewsModel;
