import Koa from 'koa';
import {DefaultState, DefaultContext} from 'koa';
import {config} from 'dotenv'
import routes from './routes'
import bodyParser from "koa-bodyparser";
import connectDatabase from "./util"
//import middleware from './middlewares'
config()

import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';


const app: Koa<DefaultState, DefaultContext> = new Koa();

//app.use(middleware())
app.use(bodyParser());
app.use(routes())

function main (): void {
    try {
        app.listen(process.env.PORT || 8080, () =>{
            console.log('App started...');
            connectDatabase(process.env.MONGO_URL)
        })

        Sentry.init({
            dsn: "https://a680d02d43344bacbe4162f9e105046d@o1080304.ingest.sentry.io/6085951",
          
            // Set tracesSampleRate to 1.0 to capture 100%
            // of transactions for performance monitoring.
            // We recommend adjusting this value in production
            tracesSampleRate: 1.0,
          });
          
          const transaction = Sentry.startTransaction({
            op: "test",
            name: "My First Test Transaction",
          });
          
          setTimeout(() => {
            try {
                throw new Error('AAaaaaa')
            } catch (e) {
              Sentry.captureException(e);
            } finally {
              transaction.finish();
            }
          }, 99);


    } catch (error) {
      console.error(error)
    }
}
  
main()
