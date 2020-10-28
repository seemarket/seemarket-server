import WebSocket from "ws";

import socketIO from "socket.io-client";


// const localHost = "ws://ec2-13-209-66-8.ap-northeast-2.compute.amazonaws.com:8080/";
const localHost = "http://localhost:8080/";


const client = socketIO.connect(localHost);


client.emit('start_simulation');
client.on('update', function(data: string) {
    console.log(data);
})