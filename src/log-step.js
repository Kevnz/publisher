module.exports = message =>
  new Promise(resolve => {
    if (process.env.NODE_ENV !== 'test') {
      console.info(message)
    }

    return resolve(true)
  })
