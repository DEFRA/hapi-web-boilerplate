module.exports = {
  plugin: require('@hapi/good'),
  options: {
    ops: {
      interval: 1000
    },
    reporters: {
      console: [
        {
          module: '@hapi/good-squeeze',
          name: 'Squeeze',
          args: [
            {
              log: '*',
              error: '*',
              response: '*',
              request: '*'
            }
          ]
        },
        {
          module: '@hapi/good-console'
        },
        'stdout'
      ]
    }
  }
}
