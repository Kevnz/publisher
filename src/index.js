const path = require('path')
const fse = require('fs-extra')
const processor = require('./process')
const publish = require('./publish')

module.exports = () => {
  processor()
    .then(() => {
      console.info('html generated')
      return fse.copy(
        path.resolve(__dirname, 'assets', 'styles.css'),
        path.resolve(process.cwd(), 'dist', 'styles.css')
      )
    })
    .then(() => {
      console.info('css copied')
      return publish()
    })
    .then(() => {
      console.info('published')
      return process.exit(0)
    })
    .catch(error => {
      console.error('failed', error)
      process.exit(1)
    })
}
