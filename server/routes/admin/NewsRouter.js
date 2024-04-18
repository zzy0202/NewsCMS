const express = require("express");
const NewsController = require("../../controller/admin/NewsController")
const NewsRouter = express.Router();
const multer = require('multer')
const upload = multer({
				dest: 'public/uploads/',
		}
)

NewsRouter.post("/adminAPI/news/addNews",upload.single("newsCover"),NewsController.addNews);
NewsRouter.get("/adminAPI/news/getNewsList",NewsController.getNewsList);
NewsRouter.post("/adminAPI/news/modifyNews",NewsController.modifyNews);

module.exports = NewsRouter;
