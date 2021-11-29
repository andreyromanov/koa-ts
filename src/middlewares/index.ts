import compose from 'koa-compose' // Compose the given middleware and return middleware

import bodyParser from 'koa-bodyparser'




export default function middleware () {
  return compose([
    
    bodyParser(),
    
  ])
}