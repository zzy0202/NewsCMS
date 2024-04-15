let JWT = require("jsonwebtoken");
const secret = "YiEr love BuBu"

let JWTToken = {
		generate: (value,expiresIn) => {
				return JWT.sign(value,secret,{
						expiresIn,
				})
		},
		verify: (token) => {
				try {
						return JWT.verify(token,secret)
				}catch (e) {
						return false;
				}
		}
}


module.exports = JWTToken;
