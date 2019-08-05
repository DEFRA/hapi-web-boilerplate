const path = require('path')
const nunjucks = require('nunjucks')
const config = require('../config')
const pkg = require('../../package.json')
const analyticsAccount = config.analyticsAccount

module.exports = {
  plugin: require('vision'),
  options: {
    engines: {
      njk: {
        compile: (src, options) => {
          const template = nunjucks.compile(src, options.environment)

          return (context) => {
            return template.render(context)
          }
        },
        prepare: (options, next) => {
          options.compileOptions.environment = nunjucks.configure([
            path.join(options.relativeTo || process.cwd(), options.path),
            'node_modules/govuk-frontend/govuk/',
            'node_modules/govuk-frontend/govuk/components/'
          ], {
            autoescape: true,
            watch: false
          })

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
      analyticsAccount: analyticsAccount
    }
  }
}
