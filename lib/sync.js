const Download = require('./download')

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

  }
  [LOCAL]() {

  }
  [REMOTE]() {

  }
}

module.exports = Synchronous