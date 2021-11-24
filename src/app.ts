import * as Koa from 'koa';
import {DefaultState, DefaultContext, ParameterizedContext} from 'koa';
import * as Router from 'koa-router';


const port = 3000;
const app: Koa<DefaultState, DefaultContext> = new Koa();

const router: Router = new Router();

router.get('/', async (ctx: ParameterizedContext<DefaultContext, DefaultState>, next) => {
    //await next();
    ctx.body = {msg : 'Greetings traveler!'}
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


app.use(router.routes()).use(router.allowedMethods());

app.listen(port, () =>{
    console.log('App started...');
})
