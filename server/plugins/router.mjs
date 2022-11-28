import home from '../routes/home.mjs'
import about from '../routes/about.mjs'
import pub from '../routes/public.mjs'

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
