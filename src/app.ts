import express from 'express'
import http from 'http'
import {Server} from 'socket.io'
import {disconnect} from "cluster";

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
const users = new Map()


app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
});
socket.on('connection', (channel) => {
    console.log(new Date().getMilliseconds().toString())
    users.set(channel, {id: new Date().getMilliseconds().toString(), name: "anon"})

    socket.on("disconnect", () => {
        users.delete(channel)
    })

    channel.on("client-name-sent", (name: string) => {
        console.log(name)
        const user = users.get(channel)
        user.name = name
    })

    channel.on("client-typing",()=>{
        console.log("signal")
        channel.broadcast.emit("user-typing",users.get(channel))
    })

    channel.on('client-message-sent', (message: string) => {
        if (typeof message !== "string") {
            return
        }
        const user = users.get(channel)
        let messItem = {
            message: message, id: new Date().getMilliseconds().toString(),
            user: {id: user.id, name: user.name}
        }

        messages = [...messages, messItem]
        console.log(message)
        socket.emit('new-message-sent', messItem)
    })
    channel.emit('init-messages-published', messages)
    console.log("user connected")
})

const PORT = process.env.PORT || 3009

server.listen(PORT, () => {
    console.log('listening on *:3009');
});

// const express = require('express');
// const app = express();
// const http = require('http');
// const server = http.createServer(app);
//
// app.get('/', (req, res) => {
//     res.send('<h1>Hello world</h1>');
// });
//
// server.listen(3009, () => {
//     console.log('listening on *:3009');
// });

// const express = require('express');
// const app = express();
// const http = require('http');
// const server = http.createServer(app);
// const { Server } = require("socket.io");
// const io = new Server(server);
//
// app.get('/', (req, res) => {
//     res.send(`<h1>Hello world</h1>`);
// });
//
// io.on('connection', (socket) => {
//     console.log('a user connected');
// });
//
// server.listen(3000, () => {
//     console.log('listening on *:3000');
// });