const path = require('path')
const fs = require('fs-extra')

module.exports = () => {
  const assetDir = fs.readdirSync(path.resolve(__dirname, '../', '.assets'))

  const assetsToCopy = assetDir
    .filter(f => f.indexOf('.html') === -1)
    .map(f => ({
      from: path.resolve(__dirname, '../', '.assets/', f),
      to: path.resolve(__dirname, '../', 'dist/', f),
    }))

  const distDir = path.resolve(__dirname, '../', 'dist/')

  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir)
  }

  assetsToCopy.forEach(element => {
    fs.copyFileSync(element.from, element.to)
  })

  return Promise.resolve()
}
