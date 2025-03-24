import nunjucks from 'nunjucks'
import vision from '@hapi/vision'
import config from '../config.js'

const path = ['server/views']

export default {
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
          const env = nunjucks.configure(
            [
              ...path,
              'node_modules/govuk-frontend/dist'
            ],
            {
              trimBlocks: true,
              lstripBlocks: true
            }
          )

          options.compileOptions.environment = env

          return next()
        }
      }
    },
    path,
    context: {
      assetPath: '/assets',
      serviceName: 'Service name',
      pageTitle: 'Service name - GOV.UK'
    },
    isCached: !config.isDev
  }
}
