const postinstall = require('./postinstall')

postinstall().then(() => {
  console.info('Assets copied')
})
