const path = require('path')
const fs = require('fs-extra')

module.exports = () => {
  const assetDir = fs.readdirSync(path.resolve(__dirname, 'install'))

  const assetsToCopy = assetDir
    .filter(f => f.indexOf('.html') === -1 || f.indexOf('.css') === -1)
    .map(f => ({
      from: path.resolve(__dirname, 'install/', f),
      to: path.resolve(process.cwd(), '.assets1/', f),
    }))

  const installDir = path.resolve(process.cwd(), '.assets1/')

  if (!fs.existsSync(installDir)) {
    fs.mkdirSync(installDir)
  }

  assetsToCopy.forEach(element => {
    fs.copyFileSync(element.from, element.to)
  })

  return Promise.resolve()
}
