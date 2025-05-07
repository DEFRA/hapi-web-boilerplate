export default [
  {
    method: 'GET',
    path: '/robots.txt',
    handler: {
      file: 'server/public/static/robots.txt'
    }
  },
  {
    method: 'GET',
    path: '/assets/govuk-frontend.min.js',
    handler: {
      file: 'node_modules/govuk-frontend/dist/govuk/govuk-frontend.min.js'
    }
  },
  {
    method: 'GET',
    path: '/stylesheets/application.min.css',
    handler: {
      file: 'node_modules/@defra/forms-engine-plugin/.public/stylesheets/application.min.css'
    }
  },
  {
    method: 'GET',
    path: '/javascripts/application.min.js',
    handler: {
      file: 'node_modules/@defra/forms-engine-plugin/.public/javascripts/application.min.js'
    }
  },
  {
    method: 'GET',
    path: '/javascripts/file-upload.min.js',
    handler: {
      file: 'node_modules/@defra/forms-engine-plugin/.public/javascripts/file-upload.min.js'
    }
  },
  {
    method: 'GET',
    path: '/assets/{path*}',
    handler: {
      directory: {
        path: [
          'server/public/static',
          'server/public/build',
          'node_modules/govuk-frontend/dist/govuk/assets'
        ]
      }
    }
  }
]
