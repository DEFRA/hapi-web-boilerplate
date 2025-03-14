import nunjucks from 'nunjucks'
import vision from '@hapi/vision'
import config from '../config.js'
import { createRequire } from 'module'
import config from '../config.mjs'
import { prepareNunjucksEnvironment, context, VIEW_PATH } from '@defra/forms-engine-plugin'

const path = [
  `node_modules/@defra/forms-engine-plugin/${VIEW_PATH}`,
  'server/views'
]

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

          prepareNunjucksEnvironment(env)

          options.compileOptions.environment = env

          return next()
        }
      }
    },
    path,
    isCached: !config.isDev,
    context
  }
}
