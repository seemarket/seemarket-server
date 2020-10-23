import WebSocket from "ws";


const localHost = "ws://ec2-3-34-44-222.ap-northeast-2.compute.amazonaws.com:8080";
const client = new WebSocket(localHost);
client.onopen = (event) => {
  console.log("open!")

  client.send("message");
  client.send("hello world!");
  client.send("start_simulation");
}
client.onmessage = (event) => {
  const data = event.data as string;
  console.log(data);
}

client.on('open', () => {
  console.log("open!")
});
