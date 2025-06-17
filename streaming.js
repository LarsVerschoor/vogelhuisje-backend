import net from 'net';
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import express from 'express';

const TCP_PORT   = 8001; // Raspberry pi birdhouse
const HTTP_PORT  = 8080; // Browser HLS stream
const STREAMS_DIR    = path.resolve('./streams');

const app = express();
app.use('/stream', express.static(STREAMS_DIR));
app.listen(HTTP_PORT, () =>
    console.log(`HLS on http://localhost:${HTTP_PORT}/stream/baseball.m3u8`)
);

fs.mkdirSync(STREAMS_DIR, { recursive: true });

let ffmpeg = null;

function startFfmpeg() {
    if (ffmpeg) return ffmpeg;

    fs.readdirSync(STREAMS_DIR).forEach(f =>
        fs.unlinkSync(path.join(STREAMS_DIR, f))
    );

    const args = [
        '-i', 'pipe:0',
        '-c:v', 'copy',
        '-f', 'hls',
        '-hls_time', '2',
        '-hls_list_size', '5',
        '-hls_flags', 'delete_segments',
        '-hls_segment_filename', path.join(STREAMS_DIR, '%04d.ts'),
        path.join(STREAMS_DIR, 'baseball.m3u8')
    ];

    ffmpeg = spawn('ffmpeg', args, { stdio: ['pipe', 'inherit', 'inherit'] });
    console.log('FFmpeg started (single stream)');

    ffmpeg.on('exit', c => {
        console.log(`FFmpeg exited (${c})`);
        ffmpeg = null;
    });

    return ffmpeg;
}


const cameraServer = net.createServer(socket => {
    console.log('Camera connected');

    socket.write('start-cam');

    const ff = startFfmpeg();
    socket.pipe(ff.stdin);

    setTimeout(() => {
        socket.write('stop-cam');
    }, 10_000);

    socket.on('data', (chunk) => {
        console.log(chunk);
    });

    socket.on('close', () => {
        console.log('Camera disconnected');
        ff.stdin.end();
        setTimeout(() => ff?.kill('SIGINT'), 500);
    });
});

cameraServer.listen(TCP_PORT, () => console.log(`Connected with camera on port ${TCP_PORT}`));