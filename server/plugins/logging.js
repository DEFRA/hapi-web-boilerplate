const good = require('@hapi/good')
const config = require('../config')
const interval = 60000
const level = config.env === 'production'
  ? 'error'
  : '*'

// Only log errors in production, otherwise log everything
const args = [{
  log: level,
  error: level,
  response: level,
  request: level
}]

module.exports = {
  plugin: good,
  options: {
    ops: {
      interval
    },
    reporters: {
      console: [
        {
          module: '@hapi/good-squeeze',
          name: 'Squeeze',
          args
        },
        {
          module: '@hapi/good-console'
        },
        'stdout'
      ]
    }
  }
}
