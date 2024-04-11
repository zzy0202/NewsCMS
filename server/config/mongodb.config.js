let mongodbConfig = require("mongoose");

mongodbConfig.connect("mongodb://localhost:27017/company_DB")
.then(res=>{
		console.log("database connected")
})
.catch(err=>{
		console.log(err);
})

