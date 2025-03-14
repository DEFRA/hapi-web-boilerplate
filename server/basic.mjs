import hapi from '@hapi/hapi'
import yar from '@hapi/yar'
import vision from '@hapi/vision'
import crumb from '@hapi/crumb'
import inert from '@hapi/inert'
import pino from 'hapi-pino'
import nunjucks from 'nunjucks'
import plugin, { prepareNunjucksEnvironment, context, VIEW_PATH } from '@defra/forms-engine-plugin'

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

const path = [
  `node_modules/@defra/forms-engine-plugin/${VIEW_PATH}`,
  'server/views'
]

await server.register({
  plugin: vision,
  options: {
    engines: {
      html: {
        compile: (src, options) => {
          const template = nunjucks.compile(src, options.environment)

          return (context) => {
            return template.render(context)
          }
        },
        prepare: (options, next) => {
          const environment = nunjucks.configure(
            [
              ...path,
              'node_modules/govuk-frontend/dist'
            ]
          )

          prepareNunjucksEnvironment(environment)

          options.compileOptions.environment = environment

          return next()
        }
      }
    },
    path,
    context
  }
})

await server.register({
  plugin
})

await server.start()
