const chalk = require('chalk')
const { format } = require('util')

let prefix = ' ssmyjs-cli'
let sep = chalk.gray('·')
let isPrefix = true

function hoc(color) {
	return function() {
		const msg = format.apply(format, arguments)
		const fn = chalk[color]
		if (isPrefix) {
			console.log(fn(prefix), sep, msg)
		} else {
			console.log(fn(msg))
		}
	}
}

exports.usePrefix = function(status) {
	isPrefix = !!status
}

exports.log = hoc('white')

exports.notes = hoc('gray')

exports.warning = hoc('yellow')

exports.error = hoc('red')

exports.success = hoc('green')

exports.message = function() {

}