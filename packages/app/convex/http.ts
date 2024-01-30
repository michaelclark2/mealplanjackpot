import { httpRouter } from 'convex/server'
import { getRandom } from './recipes'
import { httpAction } from './_generated/server'

const http = httpRouter()

http.route({
  path: '/getRandom',
  method: 'GET',
  handler: getRandom,
})
http.route({
  path: '/getRandom',
  method: 'OPTIONS',
  handler: httpAction(async (_, request) => {
    // Make sure the necessary headers are present
    // for this to be a valid pre-flight request
    const headers = request.headers
    if (
      headers.get('Origin') !== null &&
      headers.get('Access-Control-Request-Method') !== null &&
      headers.get('Access-Control-Request-Headers') !== null
    ) {
      return new Response(null, {
        headers: new Headers({
          // e.g. https://mywebsite.com, configured on your Convex dashboard
          'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
          'Access-Control-Allow-Methods': 'GET',
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Max-Age': '86400',
        }),
      })
    } else {
      return new Response()
    }
  }),
})

export default http
