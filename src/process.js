const fs = require('fs').promises
const path = require('path')
const format = require('string-template')
const showdown = require('showdown')
const converter = new showdown.Converter()
const fse = require('fs-extra')
const packageInfo = require(path.resolve(process.cwd(), 'package.json'))

module.exports = async () => {
  console.info('process', path.resolve(process.cwd(), 'readme.md'))
  const readme = await fs.readFile(
    path.resolve(process.cwd(), 'readme.md'),
    'utf8'
  )
  const header = await fs.readFile(
    path.resolve(__dirname, 'assets', 'head.html'),
    'utf8'
  )
  const footer = await fs.readFile(
    path.resolve(__dirname, 'assets', 'foot.html'),
    'utf8'
  )

  console.info('readme', readme)
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
