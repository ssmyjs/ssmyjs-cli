const path = require('path')
const program = require('commander')
const inquirer = require('inquirer')
const argv = require('minimist')(process.argv.slice(2))
const logger = require('../../lib/logger')
const helper = require('../../lib/helper')
const Run = require('../../lib/run')
logger.usePrefix(false)

program
	.usage('<project-name> [template-name]')
	.option('-c, --clone', 'use git clone')
	.option('-m, --module', 'creating projects using multiple module mode')

program.on('--help', function() {
	logger.log()
	logger.log('Examples:')
	logger.log()

	logger.notes('  # create a new project with a official template')
	logger.log('  $ ssmyjs new my-project template')
	logger.log()

	logger.notes('  # create a new project straight from a github template')
	logger.log('  $ ssmyjs new my-project username/repo')
	logger.log()

	logger.notes('  # create a new project straight from a local template')
	logger.log('  $ ssmyjs new my-project ~/fs/path/to-custom-template')
	logger.log()
})

program.parse(process.argv)

process.on('exit', function() {
	logger.log()
})

const rawName = program.args[0]
const template = program.args[1] || path.join(__dirname, '../../default_template')
const isHere = !rawName || rawName === '.'
const name = isHere ? path.relative('../', process.cwd()) : rawName
const targetPath = path.join(process.cwd(), rawName || '.')
const clone = program.clone || false
const isMultiModule = program.module || false
const maps = isMultiModule ? 'new.multiModule' : 'new.default'

const context = Object.assign(argv, {
	actionPrefix: './',
	ROOT_PATH: targetPath,
	APP_NAME: name
})

const run = new Run({
	template,
	targetPath,
	options: { name, command: 'new', maps, clone, isMultiModule, context },
	done(err, files, options) {
		if (err) return logger.error(err)
		logger.success('Generated %s', name)

		if(options.metadata.completeMessage) {
			logger.message(options.metadata.completeMessage, {
				destDirName: name,
				isPlace: targetPath === process.cwd()
			})
		}
	}
})

if (helper.isExist(targetPath)) {
	inquirer.prompt([
		{
			type: 'confirm',
			name: 'ok',
			message: isHere ? 'Generate project in current directory?' : 'Target directory exists. Continue?'
		}
	]).then(function(answers) {
		if (answers.ok) {
			run.start()
		}
	})
} else {
	run.start()
}