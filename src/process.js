const fs = require('fs').promises
const path = require('path')
const showdown = require('showdown')
const converter = new showdown.Converter()
const fse = require('fs-extra')
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
  const html = `${header}
  ${converter.makeHtml(readme)}
  ${footer}`
  await fse.ensureDir(path.resolve(process.cwd(), 'dist'))
  return fs.writeFile(path.resolve(process.cwd(), 'dist') + '/index.html', html)
}
