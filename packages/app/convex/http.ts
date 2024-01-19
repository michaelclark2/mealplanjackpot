import { httpRouter } from 'convex/server'
import { getRandom } from './recipes'

const http = httpRouter()

http.route({
  path: '/getRandom',
  method: 'GET',
  handler: getRandom,
})

export default http
