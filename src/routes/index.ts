import compose from 'koa-compose'
import Router from 'koa-router'

import employees from './employee'
import test from './test'

const children = [
  { routes: employees, prefix: '' },
  { routes: test, prefix: '' }
]

export default function routes () {
  const router = new Router()
  // Nested routers
  children.forEach(child => {
    const nestedRouter = new Router()
    child.routes(nestedRouter)
    router.use(child.prefix, nestedRouter.routes(), nestedRouter.allowedMethods())
  })

  return compose([router.routes(), router.allowedMethods()])
}