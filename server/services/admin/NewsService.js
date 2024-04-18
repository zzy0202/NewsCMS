let NewsModel = require("../../model/admin/NewsModel")

const NewsService = {
		addNews: ({title, newsContent, dates, newsCover, newsType, isPublish}) => {
				return NewsModel.insertMany({
						title, newsContent, dates, newsCover, newsType, isPublish
				})
		},
		getNewsList: () => {
				return NewsModel.find({});
		},
		modifyNews: (news) => {
				let _id = news._id
				return NewsModel.updateOne({_id},{...news});
		}
}

module.exports = NewsService;
