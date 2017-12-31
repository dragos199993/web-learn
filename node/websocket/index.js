//import usefull things
const express = require('express');
const socket = require('socket.io');

let app = express();

//listen to port 3000
let server = app.listen(3001, () => {
    console.log('Server is running...');
}); 
app.use(express.static('public')); //use the public folder to render a static page
let io = socket(server); //apply socket to server
io.sockets.on('connection', socket => {
    console.log(`New connection ${socket.id}`);
    socket.on('mouse',data => {
        socket.broadcast.emit('mouse',data);
        console.log(data);
    })
});

