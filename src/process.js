const fs = require('fs').promises
const path = require('path')
const format = require('string-template')
const showdown = require('showdown')
const converter = new showdown.Converter()
const fse = require('fs-extra')
const packageInfo = require(path.resolve(process.cwd(), 'package.json'))

module.exports = async () => {
  const readme = await fs.readFile(
    path.resolve(process.cwd(), 'readme.md'),
    'utf8'
  )
  const customHeader = await fse.pathExists(
    path.resolve(process.cwd(), '.assets', 'head.html')
  )

  const header = await fs.readFile(
    customHeader
      ? path.resolve(process.cwd(), '.assets', 'head.html')
      : path.resolve(__dirname, 'assets', 'head.html'),
    'utf8'
  )
  const customFooter = await fse.pathExists(
    path.resolve(process.cwd(), '.assets', 'foot.html')
  )
  const footer = await fs.readFile(
    customFooter
      ? path.resolve(process.cwd(), '.assets', 'foot.html')
      : path.resolve(__dirname, 'assets', 'foot.html'),
    'utf8'
  )

  converter.setFlavor('github')
  const html = `${format(header, {
    name: packageInfo.name,
    description: packageInfo.description,
  })}
  ${converter.makeHtml(readme)}
  ${footer}`
  await fse.ensureDir(path.resolve(process.cwd(), 'dist'))
  return fs.writeFile(path.resolve(process.cwd(), 'dist') + '/index.html', html)
}
