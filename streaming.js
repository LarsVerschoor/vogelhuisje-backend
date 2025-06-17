import net from 'net';

const cameraServer = net.createServer(socket => {
    console.log('Camera connected');

    socket.write('start-cam');

    setTimeout(() => {
        socket.write('stop-cam');
    }, 10_000);

    socket.on('data', (chunk) => {
        console.log(chunk);
    });

    socket.on('close', () => console.log('Camera disconnected'));
});

cameraServer.listen(8001, () => console.log('Connected with camera on port 8001'));