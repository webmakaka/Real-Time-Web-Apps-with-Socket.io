var socket = io();

socket.on('connect', () =>{
    console.log('Connected to server');
});

socket.on('disconnect', () =>{
    console.log('Disconnected from server');
});

socket.on('newMessage', (message) =>{
    console.log('New message', message);
});
