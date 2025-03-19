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
