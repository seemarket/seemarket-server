import { Context } from 'koa';
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import socketIO from "socket.io";
import http from 'http';
import api from './api';
import { Connection, createConnection } from 'typeorm';
createConnection().then(async connection => {

  console.log("Here you can setup and run express/koa/any other framework.");

}).catch(error => console.log(error));
const app = new Koa();
const server = http.createServer(app.callback());
export const io = socketIO(server);

const router = new Router();

router.use('/api', api.routes());
app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());

app.use((ctx: Context) => { ctx.body = 'hello, World!'; });
app.listen(80,
  () => { console.log('Listening to port 80'); }
);
