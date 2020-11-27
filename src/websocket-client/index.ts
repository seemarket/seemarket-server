import WebSocket from "ws";

import socketIO from "socket.io-client";
import { CreateCommand } from '../simulation/create_product';


// const localHost = "http://ec2-13-209-66-8.ap-northeast-2.compute.amazonaws.com:8080/";
const localHost = "ws://localhost:8080/";


const client = socketIO.connect(localHost);


// client.emit('start_simulation');
// client.emit('reset_simulation');
const createCommand: CreateCommand = {
    product_id: 1,
    row: 100.0,
    column: 100.1,
    depth: 10.24
}
client.emit('create_product', createCommand);
client.on('update', function(data: string) {
    console.log(data);
})

client.on('reset_result', function(data: string) {
    console.log(data);
})

client.on('create_result', function(data: string) {
    console.log(data);
})