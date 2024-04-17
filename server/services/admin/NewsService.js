let NewsModel = require("../../model/admin/NewsModel")

const NewsService = {
		addNews: ({title, newsContent, dates, newsCover, newsType}) => {
				return NewsModel.insertMany({
						title, newsContent, dates, newsCover, newsType,
				})
		}
}

module.exports = NewsService;
