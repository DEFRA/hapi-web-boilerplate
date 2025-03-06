import path from 'path'
import * as url from 'url'
import nunjucks from 'nunjucks'
import vision from '@hapi/vision'
import config from '../config.mjs'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const pkg = require('../../package.json')
const analyticsAccount = config.analyticsAccount
const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

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
          options.compileOptions.environment = nunjucks.configure(
            [
              path.join(options.relativeTo || process.cwd(), options.path),
              'node_modules/govuk-frontend/dist'
            ],
            {
              autoescape: true,
              watch: false
            }
          )

          return next()
        }
      }
    },
    path: '../views',
    relativeTo: __dirname,
    isCached: !config.isDev,
    context: {
      appVersion: pkg.version,
      assetPath: '/assets',
      serviceName: 'Service name',
      pageTitle: 'Service name - GOV.UK',
      analyticsAccount
    }
  }
}
