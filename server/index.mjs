import hapi from '@hapi/hapi'
import inert from '@hapi/inert'
import blipp from 'blipp'
import config from './config.mjs'
import views from './plugins/views.mjs'
import router from './plugins/router.mjs'
import errorPages from './plugins/error-pages.mjs'
import logging from './plugins/logging.mjs'

async function createServer () {
  // Create the hapi server
  const server = hapi.server({
    port: config.port,
    routes: {
      validate: {
        options: {
          abortEarly: false
        }
      }
    }
  })

  // Register the plugins
  await server.register(inert)
  await server.register(views)
  await server.register(router)
  await server.register(errorPages)
  await server.register(logging)
  await server.register(blipp)

  return server
}

export default createServer
