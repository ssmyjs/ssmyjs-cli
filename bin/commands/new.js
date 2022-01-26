const program = require('commander')
const logger = require('../../lib/logger')
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

