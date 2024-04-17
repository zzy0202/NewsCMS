const getTodayDates = () => {
		let date = new Date();
		return `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`
}

export {
		getTodayDates,
}
