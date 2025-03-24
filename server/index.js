import hapi from '@hapi/hapi'
import inert from '@hapi/inert'
import blipp from 'blipp'
import config from './config.js'
import views from './plugins/views.js'
import router from './plugins/router.js'
import errorPages from './plugins/error-pages.js'
import logging from './plugins/logging.js'

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
