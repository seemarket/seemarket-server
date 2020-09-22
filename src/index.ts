import { Context } from 'koa';
import Koa from 'koa';
const app = new Koa();
app.use((ctx: Context) => { ctx.body = 'hello, Jacob!'; });
app.listen(4000,
  () => { console.log('Listening to port 4000'); }
);
