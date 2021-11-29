import Koa from 'koa';
import {DefaultState, DefaultContext} from 'koa';
import {config} from 'dotenv'
import routes from './routes'
import bodyParser from "koa-bodyparser";
import connectDatabase from "./util"
//import middleware from './middlewares'
config()

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
    } catch (error) {
      console.error(error)
    }
}
  
main()
