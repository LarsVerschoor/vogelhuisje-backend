import net from 'net';
import { spawn } from 'child_process';
import WebSocket, { WebSocketServer } from 'ws';
import http from 'http';

const TCP_PORT = 8001; // Raspberry pi birdhouse
const HTTP_PORT = 8080; // Browser HLS stream

const server = http.createServer();
const wss = new WebSocketServer({ server });

let clients = [];

wss.on('connection', (socket) => {
    console.log('client connected');
    clients.push(socket);

    socket.on('close', () => {
       clients = clients.filter(s => s !== socket);
       console.log('client disconnected');
    });
})

server.listen(HTTP_PORT, () => {
    console.log(`WebSocket server running on ws://localhost:${HTTP_PORT}`);
});

const ffmpeg = spawn('ffmpeg', [
    '-f', 'h264',
    '-i', 'pipe:0',
    '-f', 'mpegts',
    '-codec:v', 'mpeg1video',
    '-s', '640x480',
    '-b:v', '800k',
    '-r', '30',
    '-'
], { stdio: ['pipe', 'pipe', 'inherit'] });

ffmpeg.stdout.on('data', (chunk) => {
    clients.forEach((socket) => {
        if (socket.readyState === WebSocket.OPEN) {
            socket.send(chunk);
        }
    });
});

const cameraServer = net.createServer(socket => {
    console.log('Camera connected');

    socket.write('start-cam');

    socket.pipe(ffmpeg.stdin);

    setTimeout(() => {
        socket.write('stop-cam');
    }, 100_000);

    socket.on('data', (chunk) => {
        console.log(chunk);
    });

    socket.on('close', () => {
        console.log('Camera disconnected');
        ffmpeg.stdin.end();
        setTimeout(() => ffmpeg?.kill('SIGINT'), 500);
    });
});

cameraServer.listen(TCP_PORT, () => console.log(`Connected with camera on port ${TCP_PORT}`));