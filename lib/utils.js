
module.exports = {
	isLocalPath(templatePath) {
		return /^[./]|(^[a-zA-Z]:)/.test(templatePath)
	}
}