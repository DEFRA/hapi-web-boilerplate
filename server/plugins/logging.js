const config = require('../config')

module.exports = {
  plugin: require('@hapi/log'),
  options: {
    level: config.isDev ? 'debug' : 'warning'
  }
}
