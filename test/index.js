const Lab = require('@hapi/lab')
const Code = require('@hapi/code')
const lab = exports.lab = Lab.script()
const createServer = require('../server')

lab.experiment('Web test', () => {
  let server

  // Create server before the tests
  lab.before(async () => {
    server = await createServer()
  })

  lab.test('GET / route works', async () => {
    const options = {
      method: 'GET',
      url: '/'
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(200)
    Code.expect(response.headers['content-type']).to.include('text/html')
  })

  lab.test('POST / route works', async () => {
    const options = {
      method: 'POST',
      url: '/',
      payload: {
        email: 'a@b.com'
      }
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(200)
    Code.expect(response.headers['content-type']).to.include('text/html')
  })

  lab.test('POST / route fails with invalid payload', async () => {
    const options = {
      method: 'POST',
      url: '/',
      payload: {
        email: 'a@b'
      }
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(400)
  })

  lab.test('GET /about route works', async () => {
    const options = {
      method: 'GET',
      url: '/about'
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(200)
    Code.expect(response.headers['content-type']).to.include('text/html')
  })
})
