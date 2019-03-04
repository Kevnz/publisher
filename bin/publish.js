#!/usr/bin/env node

const pub = require('../src/task')

pub()
  .then(() => {
    return process.exit(0)
  })
  .catch(error => {
    console.error('failed', error)
    process.exit(1)
  })
