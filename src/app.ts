import express from 'express'
import http from 'http'
import {Server} from 'socket.io'
import {disconnect} from "cluster";
import {v1} from "uuid";


const app = express()
const server = http.createServer(app);
const socket = new Server(server, {
    cors: {
        origin: "http://localhost:3000"
    }
})

let messages = [
    {message: "hello", id: "1", user: {id: "1", name: "azaza"}},
    {message: "hello blia", id: "2", user: {id: "2", name: "ololo"}},
    {message: "hello ept", id: "3", user: {id: "3", name: "uzuzu"}},
]
const users = new Map<any,{id:string,name:string}>()


app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
});
socket.on('connection', (channel) => {
    users.set(channel, {id: v1(), name: "anon"})

    socket.on("disconnect", () => {
        users.delete(channel)
    })

    channel.on("client-name-sent", (name: string) => {
        const user = users.get(channel)
        user.name = name
    })

    channel.on("client-typing",()=>{
        console.log("typing")
        channel.broadcast.emit("user-typing",users.get(channel))
    })
    channel.on("client-not-typing",()=>{
        console.log("not-typing")
        channel.broadcast.emit("user-not-typing",users.get(channel))
    })

    channel.on('client-message-sent', (message: string) => {
        if (typeof message !== "string" ) {
            return
        }
        if(!message.trim()){
            return
        }
        const user = users.get(channel)
        let messageEntity = {message , id: v1(), user}
        messages = [...messages, messageEntity]
        socket.emit('new-message-sent', messageEntity)
    })
    channel.emit('init-messages-published', messages)
    console.log("user connected")
})

const PORT = process.env.PORT || 3009

server.listen(PORT, () => {
    console.log('listening on *:3009');
});

