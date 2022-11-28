import log from '@hapi/log'
import config from '../config.mjs'

const events = ['log', 'request', 'start', 'stop']

export default {
  plugin: log,
  options: {
    events,
    ignoreChannels: ['internal'],
    level: config.isDev ? 'debug' : 'info'
  }
}