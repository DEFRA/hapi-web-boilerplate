import log from 'hapi-pino'

const events = ['log', 'request', 'start', 'stop']

export default {
  plugin: log,
  options: {
    events,
    ignoreChannels: ['internal'],
    level: 'error'
  }
}
