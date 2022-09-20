"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var http_1 = __importDefault(require("http"));
var socket_io_1 = require("socket.io");
var app = (0, express_1.default)();
var server = http_1.default.createServer(app);
var io = new socket_io_1.Server(server);
app.get('/', function (req, res) {
    res.send('<h1>Hello world</h1>');
});
io.on('connection', function (socket) {
    console.log("user connected");
});
var PORT = process.env.PORT || 3009;
server.listen(PORT, function () {
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
//# sourceMappingURL=app.js.map