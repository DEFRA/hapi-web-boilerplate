const config = require('../config')
const events = ['log', 'request', 'start', 'stop']

module.exports = {
  plugin: require('@hapi/log'),
  options: {
    events,
    ignoreChannels: ['internal'],
    level: config.isDev ? 'debug' : 'info'
  }
}
