const path = require('path')
const fse = require('fs-extra')
const processor = require('./process')
const publish = require('./publish')
const copy = require('./copy')
const logStep = require('./log-step')

const generate = async () => {
  return processor()
    .then(() => logStep('HTML generated'))
    .then(copy)
    .then(() => {
      return fse.copy(
        path.resolve(__dirname, 'assets', 'styles.css'),
        path.resolve(process.cwd(), 'dist', 'styles.css')
      )
    })
    .then(() => logStep('CSS copied'))
}

module.exports = () => {
  return generate()
    .then(() => {
      return publish()
    })
    .then(() => logStep('published to github'))
}
