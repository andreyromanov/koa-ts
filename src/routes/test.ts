import Router from 'koa-router'

export default (router: Router) => {
    router.get('/', async (ctx, next) => {
        await next();
        //ctx.body = {msg : 'Greetings traveler, Andrii!'}
    });
    router.get('/', async (ctx, next) => {
        const start = Date.now();
        console.log('before', ctx.body);
        await next();
        console.log('after', ctx.body);
        const ms = Date.now() - start;
        ctx.set('X-Response-Time', `${ms}ms`);
    });
    router.get('/', async (ctx) =>{
        ctx.body = 'Hello Andrii'
    });

    router
    /** Print the routes list */
    .get('/api', (ctx) => {
      const map = new Map<string, Set<string>>()
      router.stack.forEach(layer => {
        if (map.has(layer.path)) {
          const methods = map.get(layer.path) as Set<string>
          layer.methods.forEach(method => methods.add(method))
        } else {
          map.set(layer.path, new Set(layer.methods))
        }
      })
      ctx.body = [...map.entries()].map(([path, methods]) => `[${[...methods].join(' ')}] ${path}`)
    })

    router.get('/echo', (ctx) => {
      ctx.body = { method: ctx.method, headers: ctx.headers, query: ctx.query }
    })
    .post('/echo', (ctx) => {
      ctx.body = { method: ctx.method, headers: ctx.headers, query: ctx.query, params: ctx.request.body }
    })
}