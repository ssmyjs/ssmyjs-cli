const os = require('os')
const path = require('path')

const templateCacheDirectory = path.join(os.homedir(), '.ssmyjs-templates')

module.exports = {
  templateCacheDirectory
}