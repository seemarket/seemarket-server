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

const io = socketIO({transports: ['websocket']});


io.attach(8080);

io.on('connection', function(socket) {
  socket.on('start_simulation', function(data) {
    startSimulation(io);
  })
})

const router = new Router();

router.use('/api', api.routes());
app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());

app.use((ctx: Context) => { ctx.body = 'hello, World!'; });
app.listen(80,
  () => { console.log('Listening to port 80'); }
);
