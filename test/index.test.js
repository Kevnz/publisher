const fs = require('fs')
const path = require('path')
const mock = require('mock-fs')
const { expect } = require('chai')
const fuxor = require('fuxor')
const pkg = require('../package.json')

fuxor.add('gh-pages', {
  publish: function(path, options, callback) {
    callback(null)
  },
})

const assetsDotDir = path.resolve(process.cwd(), '.assets')
const assetsModuleDir = path.resolve(process.cwd(), 'src', 'assets')
const distDir = path.resolve(process.cwd(), 'dist')

const head = `<!DOCTYPE html>
<html lang="en">

<head>
  <title>{name}</title>
  <link rel="stylesheet" type="text/css" href="styles.css" />
  <meta name="description" content="{description}" />
  <meta name="keywords" content="{keywords}" />
  <meta name="homepage" content="{homepage}" />
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
</head>

<body>
  <div class="container">
  `

const foot = `</div>
  <footer>Foot</footer>
  </body>`

const css = `/*!
styles.css
*/
body {
  background: #000;
}
`

const otherCss = `/*!
styles.css
*/
body {
  background: #CCC;
}
`
const processor = require('../src/process')
const copy = require('../src/copy')
const task = require('../src/task')
process.on('unhandledRejection', () => {})

describe('The Publisher Module', () => {
  it('Verify The Index file is written with the correct results', done => {
    const mockStructure = {
      [process.cwd()]: {
        'readme.md': '# THIS IS A TEST',
        '.assets': {
          'head.html': head,
          'foot.html': foot,
          'styles.css': css,
        },
        src: {
          assets: {
            'head.html': head,
            'foot.html': foot,
            'styles.css': css,
          },
        },
        dist: {},
      },
    }
    mock(mockStructure, { createCwd: false })
    processor()
      .then(() => {
        const file = fs.readFileSync(
          path.resolve(process.cwd(), 'dist', 'index.html'),
          'utf8'
        )
        const distDir = fs.readdirSync(path.resolve(process.cwd(), 'dist'))

        expect(distDir.length).to.equal(1)

        expect(distDir[0]).to.equal('index.html')
        expect(file.indexOf(pkg.name)).to.not.equal(-1)
        expect(file.indexOf(pkg.description)).to.not.equal(-1)
        expect(file.indexOf(pkg.keywords)).to.not.equal(-1)
        expect(file.indexOf(pkg.homepage)).to.not.equal(-1)
        expect(file.indexOf('THIS IS A TEST')).to.not.equal(-1)
        mock.restore()
        done()
      })
      .catch(err => {
        mock.restore()
        done(err)
      })
  })
  it('Verify files are copied', done => {
    const mockStructure = {
      [process.cwd()]: {
        'readme.md': '# THIS IS A TEST',
        '.assets': {
          'extra.css': css,
          'other.css': css,
          'head.html': 'the head',
          'styles.css': otherCss,
        },
        src: {
          assets: {
            'head.html': head,
            'foot.html': foot,
            'styles.css': css,
          },
        },
        dist: {},
      },
    }
    mock(mockStructure, { createCwd: false })
    copy()
      .then(() => {
        const distDir = fs.readdirSync(path.resolve(process.cwd(), 'dist'))
        expect(distDir.length).to.equal(3)

        expect(distDir.includes('extra.css')).to.equal(true)
        expect(distDir.includes('other.css')).to.equal(true)
        expect(distDir.includes('styles.css')).to.equal(true)
        mock.restore()
        done()
      })
      .catch(err => {
        mock.restore()
        done(err)
      })
  })

  it('Verify The Task process', done => {
    const mockStructure = {
      [process.cwd()]: {
        'readme.md': '# THIS IS A TEST',
        '.assets': {
          'head.html': head,
          'foot.html': foot,
          'styles.css': css,
        },
        src: {
          assets: {
            'head.html': head,
            'foot.html': foot,
            'styles.css': css,
          },
        },
        dist: {},
      },
    }
    mock(mockStructure, { createCwd: false })
    task()
      .then(() => {
        const file = fs.readFileSync(
          path.resolve(process.cwd(), 'dist', 'index.html'),
          'utf8'
        )
        const distDir = fs.readdirSync(path.resolve(process.cwd(), 'dist'))

        expect(distDir.length).to.equal(2)

        expect(distDir.includes('styles.css')).to.equal(true)
        expect(distDir.includes('index.html')).to.equal(true)

        expect(file.indexOf(pkg.name)).to.not.equal(-1)
        expect(file.indexOf(pkg.description)).to.not.equal(-1)
        expect(file.indexOf('THIS IS A TEST')).to.not.equal(-1)
        mock.restore()
        done()
      })
      .catch(err => {
        mock.restore()
        done(err)
      })
  })
  it('Verify The Task process with extra files', done => {
    const mockStructure = {
      [process.cwd()]: {
        'readme.md': '# THIS IS A TEST',
        '.assets': {
          'head.html': head,
          'foot.html': foot,
          'styles.css': css,
          'extra.css': css,
          'other.css': css,
        },
        src: {
          assets: {
            'head.html': head,
            'foot.html': foot,
            'styles.css': css,
          },
        },
        dist: {},
      },
    }
    mock(mockStructure, { createCwd: false })
    task()
      .then(() => {
        const file = fs.readFileSync(
          path.resolve(process.cwd(), 'dist', 'index.html'),
          'utf8'
        )
        const distDir = fs.readdirSync(path.resolve(process.cwd(), 'dist'))

        expect(distDir.includes('styles.css')).to.equal(true)
        expect(distDir.includes('extra.css')).to.equal(true)
        expect(distDir.includes('other.css')).to.equal(true)
        expect(distDir.includes('index.html')).to.equal(true)
        expect(distDir.length).to.equal(4)
        expect(file.indexOf(pkg.name)).to.not.equal(-1)
        expect(file.indexOf(pkg.description)).to.not.equal(-1)
        expect(file.indexOf('THIS IS A TEST')).to.not.equal(-1)
        mock.restore()
        done()
      })
      .catch(err => {
        mock.restore()
        done(err)
      })
  })
})
