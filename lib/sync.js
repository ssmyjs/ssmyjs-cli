const Download = require('./download')
const utils = require('./utils')
const logger = require('./logger')

const LOCAL = Symbol('ssmyjs-cli#local')
const REMOTE = Symbol('ssmyjs-cli#remote')
class Synchronous extends Download {
  constructor(options) {
    super()
    this.template = options.template
    this.cacheTemplatePath = options.cacheTemplatePath
    this.clone = options.clone
  }
  start() {
		return utils.isLocalPath(this.template) ? this[LOCAL] : this[REMOTE]
  }
  [LOCAL]() {

  }
  [REMOTE]() {
		const template = this.template.indexOf('/') > -1 ? this.template : 'ssmyjs-template/' + this.template

		return this.download(template, this.cacheTemplatePath, this.clone).then(
			_ => this.cacheTemplatePath, 
			err => {
				if (err instanceof Error) err = err.message.trim()
				logger.log()
				logger.error('Remote template synchronization failed, reason: "%s".', err)
			}
		)
  }
}

module.exports = Synchronous