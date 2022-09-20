
import express from 'express'
import http from 'http'

import {Server} from 'socket.io'

const app=express()
const server = http.createServer(app);
const io= new Server(server)


app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
});
io.on('connection',(socket)=>{
    console.log("user connected")
})

server.listen(3009, () => {
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