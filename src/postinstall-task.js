const postinstall = require('./postinstall')

postinstall().then(result => {
  console.info(result ? 'Assets copied' : 'Skipped Assets')
})
