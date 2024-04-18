const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let NewsType = {
		title:String,
		newsContent:String,
		dates:String,
		newsCover:String,
		newsType:String,
		isPublish:Boolean,
}

const NewsModel = mongoose.model("news",new Schema(NewsType));

module.exports = NewsModel;
