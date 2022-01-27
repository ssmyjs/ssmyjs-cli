const path = require('path')
const fs = require('fs')

const fsReadDir = promisify(fs.readdir, fs)
const fsUnlink = promisify(fs.unlink, fs)
const fsRmdir = promisify(fs.rmdir, fs)

// check path is exist
function isExist(dir) {
  dir = path.normalize(dir)
  try {
    fs.accessSync(dir, fs.constants.R_OK)
    return true
  } catch(e) {
    return false
  }
}

// make callback function to promise
function promisify(fn, receiver) {
  receiver = receiver || fn
  return (...args) => {
    return new Promise((resolve, reject) => {
      fn.apply(receiver, [...args, (err, res) => { return err ? reject(err) : resolve(res) }])
    })
  }
}

// check path is directory
function isDirectory(filePath) {
  if (!isExist(filePath)) return false

  try {
    const stat = fs.statSync(filePath)
    return stat.isDirectory()
  } catch(e) {
    return false
  }
}

// remove dir sync
function rmdir(p, reserve) {
  if (!isDirectory(p)) return Promise.resolve()

  return fsReadDir(p).then(files => {
    const promises = files.map(item => {
      const filepath = path.join(p, item)
      if (isDirectory(filepath)) return rmdir(filepath, false)
      return fsUnlink(filepath)
    })

    return Promise.all(promises).then(() => {
      if (!reserve) return fsRmdir(p)
    })
  })
}

exports.isExist = isExist
exports.promisify = promisify
exports.rmdir = rmdir