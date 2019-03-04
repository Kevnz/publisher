const path = require('path')
const fs = require('fs-extra')

module.exports = () => {
  const assetDir = fs.readdirSync(path.resolve(process.cwd(), '.assets'))

  const assetsToCopy = assetDir
    .filter(f => f.indexOf('.html') === -1)
    .map(f => ({
      from: path.resolve(process.cwd(), '.assets/', f),
      to: path.resolve(process.cwd(), 'dist/', f),
    }))

  const distDir = path.resolve(process.cwd(), 'dist/')

  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir)
  }

  assetsToCopy.forEach(element => {
    fs.copyFileSync(element.from, element.to)
  })

  return Promise.resolve()
}
