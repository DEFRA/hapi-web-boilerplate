const joi = require('@hapi/joi')

module.exports = [{
  method: 'GET',
  path: '/',
  handler: (request, h) => {
    return h.view('home', {
      title: 'Hello',
      message: 'World'
    })
  }
}, {
  method: 'POST',
  path: '/',
  handler: (request, h) => {
    return h.view('home', {
      title: 'Hello',
      message: 'World'
    })
  },
  options: {
    validate: {
      payload: joi.object().keys({
        email: joi.string().email().required()
      })
    }
  }
}]
