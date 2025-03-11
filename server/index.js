import hapi from '@hapi/hapi'
import inert from '@hapi/inert'
import crumb from '@hapi/crumb'
import blipp from 'blipp'
import config from './config.mjs'
import views from './plugins/views.mjs'
import router from './plugins/router.mjs'
import forms from './plugins/forms.mjs'
import session from './plugins/session.mjs'
import errorPages from './plugins/error-pages.mjs'
import logging from './plugins/logging.mjs'
import schmervice from '@hapipal/schmervice'
import { CacheService } from '@defra/forms-engine-plugin'
import { Engine as CatboxMemory } from '@hapi/catbox-memory'

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
    },
    cache: [
      {
        name: 'session',
        engine: new CatboxMemory()
      }
    ]
  })

  // Register the plugins
  await server.register(logging)
  await server.register(inert)
  await server.register(crumb)
  await server.register(session)
  await server.register(schmervice)

  server.registerService(CacheService)

  await server.register(views)
  await server.register(router)
  await server.register(forms)
  await server.register(errorPages)
  await server.register(blipp)

  return server
}

export default createServer
