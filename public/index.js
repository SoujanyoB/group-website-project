var socket = io();
var messageDisplayDOM = document.querySelector('.chat-display-section');
var formDOM = document.getElementById('chat');
var messageInputDOM = document.getElementById('chatMessage');

formDOM.addEventListener('submit', (e)=> {
    e.preventDefault();
    socket.emit("chat-message", messageInputDOM.value);
    let message = document.createElement('div');
    message.innerText = messageInputDOM.value;
    messageDisplayDOM.appendChild(message);
    messageInputDOM.value = "";
});

socket.on('received', data => {
        let receivedMessage = document.createElement('div');
        receivedMessage.innerText = data.message;
        messageDisplayDOM.appendChild(receivedMessage);
});