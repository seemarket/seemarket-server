import { Context } from 'koa';
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import socketIO from "socket.io";
import http from 'http';
import api from './api';
import { Connection, createConnection } from 'typeorm';
import WebSocket from 'ws';
import { changeSimulation, moveSimulation, startSimulation, stopSimulation } from './simulation';
import { initializeSimulator } from './simulation/initialize_stall';
import { createProduct } from './simulation/create_product';
import { moveProduct } from './simulation/move_product';
import { deleteProduct } from './simulation/delete_product';
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
  socket.on('move_simulation', function(data) {
    moveSimulation(io);
  })
  socket.on('change_simulation', function(data) {
    changeSimulation(io);
  })
  socket.on('stop_simulation', function(data) {
    stopSimulation(io);
  })
  socket.on('reset_simulation',  function(data) {
    initializeSimulator(io);
  })
  socket.on('create_product', function(data) {
    createProduct(io, data);
  })
  socket.on('move_product', function(data) {
    moveProduct(io, data);
  })
  socket.on('delete_product', function(data) {
    deleteProduct(io, data);
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
