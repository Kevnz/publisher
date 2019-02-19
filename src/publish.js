const path = require('path')
const ghpages = require('gh-pages')
const fse = require('fs-extra')

module.exports = () =>
  new Promise((resolve, reject) => {
    return fse.ensureDir(path.resolve(process.cwd(), 'dist')).then(() => {
      return ghpages.publish(path.resolve(process.cwd(), 'dist'), err => {
        if (err) {
          return reject(err)
        }
        return resolve(true)
      })
    })
  })
