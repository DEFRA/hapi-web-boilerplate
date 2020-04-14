const config = require('../config')

module.exports = {
  plugin: require('hapi-pino'),
  options: {
    logPayload: true,
    prettyPrint: config.isDev,
    level: config.isDev ? 'debug' : 'warn'
  }
}
