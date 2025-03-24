import hapi from '@hapi/hapi'
import yar from '@hapi/yar'
import crumb from '@hapi/crumb'
import inert from '@hapi/inert'
import pino from 'hapi-pino'
import plugin from '@defra/forms-engine-plugin'

const server = hapi.server({
  port: 3000
})

// Register the dependent plugins
await server.register(pino)
await server.register(inert)
await server.register(crumb)
await server.register({
  plugin: yar,
  options: {
    cookieOptions: {
      password: 'ENTER_YOUR_SESSION_COOKIE_PASSWORD_HERE' // Must be > 32 chars
    }
  }
})

// Register the `forms-engine-plugin`
await server.register({
  plugin
})

await server.start()
