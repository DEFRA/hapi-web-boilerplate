import home from '../routes/home.js'
import about from '../routes/about.js'
import pub from '../routes/public.js'

const routes = [].concat(
  home,
  about,
  pub
)

export default {
  plugin: {
    name: 'router',
    register: (server, options) => {
      server.route(routes)
    }
  }
}
