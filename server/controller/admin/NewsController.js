let NewsService = require("../../services/admin/NewsService")

const NewsController = {
		addNews: async (req,res) => {
				req.body.newsCover = req.file.filename;
				let result =await NewsService.addNews(req.body);
				if(result.length>0) {
						res.send({
								ok:1,
								msg:"Add news success"
						})
				}
				else {
						res.send({
								ok:0,
								msg:"Add news fail"
						})
				}
		}
}

module.exports = NewsController
