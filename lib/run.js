const path = require('path')
const Download = require('./download')
const helper = require('./helper')
const config = require('../config')
const Sync = require('./sync')
const GENERATE_CACHE = Symbol('ssmyjs-cli#cache')
const GENERATE_REMOTE = Symbol('ssmyjs-cli#remote')

class Run extends Download {
  constructor(options) {
    super()
    this.options = options
    this._cacheTemplatePath = path.join(config.templateCacheDirectory, this.options.template.replace(/[\\/\\:]/g, '-'))
    this.sync = new Sync(Object.assign(options, {
      cacheTemplatePath: this._cacheTemplatePath
    }))
  }
  start() {
    helper.isExist(this._cacheTemplatePath) ? this[GENERATE_CACHE]() : this[GENERATE_REMOTE]()
  }
  generate() {

  }
  [GENERATE_CACHE]() {
    return this.generate()
  }
  [GENERATE_REMOTE]() {
    return this.sync.start()
      .thne(_ => this.generate())
  }
}

module.exports = Run