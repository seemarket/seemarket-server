import { Context } from 'koa';
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import socketIO from "socket.io";
import http from 'http';
import api from './api';
import { Connection, createConnection } from 'typeorm';
import WebSocket from 'ws';
import { startSimulation } from './simulation';
createConnection().then(async connection => {

  console.log("Here you can setup and run express/koa/any other framework.");

}).catch(error => console.log(error));
const app = new Koa();
const wss = new WebSocket.Server({port: 8080});


wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    const messageString = message as string;
    switch (messageString) {
      case 'start_simulation':
        startSimulation(ws);
        break;
      default:
        break;
    }
    console.log('received: %s', message);
  });
});
const router = new Router();

router.use('/api', api.routes());
app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());

app.use((ctx: Context) => { ctx.body = 'hello, World!'; });
app.listen(80,
  () => { console.log('Listening to port 80'); }
);
