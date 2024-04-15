import axios from "axios";

axios.interceptors.request.use(function (req) {
		let token = localStorage.getItem("token");
		req.headers.authorization = `Bearer ${token}`;
		return req;
}, function (error) {
		// Do something with request error
		return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
		let {authorization} = response.headers;
		localStorage.setItem("token", authorization)
		return response;
}, function (error) {
		console.log(error)
		if (error.response.status === 401) {
				location.href="/login";
				console.log("kmsdkmdksmdkk")
		}
		return Promise.reject(error);
});
