import path from 'path'
import * as url from 'url'
import nunjucks from 'nunjucks'
import vision from '@hapi/vision'
import config from '../config.js'
import { createRequire } from 'module'
import config from '../config.mjs'
// import { createRequire } from 'module'
import { context } from '@defra/forms-engine-plugin/.server/server/plugins/nunjucks/context.js'
import * as filters from '@defra/forms-engine-plugin/.server/server/plugins/nunjucks/filters/index.js'
import { checkErrorTemplates, checkComponentTemplates, evaluate } from '@defra/forms-engine-plugin/.server/server/plugins/nunjucks/environment.js'

// const require = createRequire(import.meta.url)
// const pkg = require('../../package.json')
// const analyticsAccount = config.analyticsAccount
const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

const env = nunjucks.configure(
  [
    'node_modules/@defra/forms-engine-plugin/src/server/plugins/engine/views',
    'node_modules/@defra/forms-engine-plugin/src/server/views',
    path.join(__dirname, '../views'),
    'node_modules/govuk-frontend/dist'
  ],
  {
    autoescape: true,
    watch: false
  }
)

// export const paths = [
//   join(config.get('appDir'), 'plugins/engine/views'),
//   join(config.get('appDir'), 'views')
// ]

// export const environment = nunjucks.configure(
//   [...paths, join(govukFrontendPath, 'dist')],
//   {
//     trimBlocks: true,
//     lstripBlocks: true,
//     watch: config.get('isDevelopment'),
//     noCache: config.get('isDevelopment')
//   }
// )

for (const [name, nunjucksFilter] of Object.entries(filters)) {
  env.addFilter(name, nunjucksFilter)
}

env.addGlobal('evaluate', evaluate)
env.addGlobal('checkErrorTemplates', checkErrorTemplates)
env.addGlobal('checkComponentTemplates', checkComponentTemplates)

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
          options.compileOptions.environment = env

          return next()
        }
      }
    },
    path: [
      '../views',
      '../../node_modules/@defra/forms-engine-plugin/src/server/plugins/engine/views',
      '../../node_modules/@defra/forms-engine-plugin/src/server/views'
    ],
    relativeTo: __dirname,
    isCached: !config.isDev,
    context: () => {
      return context()
    }
    // context: {
    //   appVersion: pkg.version,
    //   assetPath: '/assets',
    //   serviceName: 'Service name',
    //   pageTitle: 'Service name - GOV.UK',
    //   analyticsAccount
    // }
  }
}
