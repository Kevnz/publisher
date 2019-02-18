const path = require('path')
const fse = require('fs-extra')
const processor = require('./process')
const publish = require('./publish')

const logStep = message =>
  new Promise(resolve => {
    console.info(message)
    return resolve(true)
  })

const generate = async () => {
  return processor()
    .then(() => logStep('HTML generated'))
    .then(() => {
      return fse.copy(
        path.resolve(__dirname, 'assets', 'styles.css'),
        path.resolve(process.cwd(), 'dist', 'styles.css')
      )
    })
    .then(() => logStep('CSS copied'))
}

module.exports = () => {
  generate()
    .then(() => {
      return publish()
    })
    .then(() => logStep('published to github'))
    .then(() => {
      return process.exit(0)
    })
    .catch(error => {
      console.error('failed', error)
      process.exit(1)
    })
}
