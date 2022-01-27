const downloadRaw = require('download-git-repo')
const ora = require('ora')
const helper = require('./helper')
const logger = require('./logger')
const download = helper.promisify(downloadRaw)

const DOWNLOAD = Symbol('ssmyjs-cli#download')
const ENSURE_CACHE_PATH = Symbol('ssmyjs-cli#ensureCachePath')

class Download {
  download(template, cachePath, clone) {
    const spinner = ora({ text: 'download template...', spinner: 'arrow3' }).start()

    return this[ENSURE_CACHE_PATH](cachePath)
      .then(this[DOWNLOAD](template, cachePath, clone))
      .then(_ => {
        spinner.stop()
        return cachePath
      })
      .catch(err => {
        spinner.stop()
        logger.error(err)
      })
  }

  [ENSURE_CACHE_PATH](path) {
    return helper.isExist(path) ? helper.rmdir(path) : Promise.resolve()
  }

  [DOWNLOAD](template, target, clone) {
    return _ => download(template, target, { clone })
  }
}

module.exports = Download