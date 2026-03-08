const messageBox = document.getElementById('chat-messages-div');
const messageInput = document.getElementById('new-message-input');
const sendButton = document.getElementById('send-message-button');
const nameButton = document.getElementById('name-button');
const socket = io();


nameButton.addEventListener('click', (e) => {
    e.preventDefault();
    userName = document.getElementById('user-name').value;
    if (userName.trim()) {
        socket.emit('userName', userName);
        document.getElementById('overlay').style.display = 'none';
    }
})


sendButton.addEventListener('click', (e) => {
    e.preventDefault();
    if (messageInput.value) {
        socket.emit('message', messageInput.value);
        messageInput.value = "";
    }

});

socket.on('message', (msg) => {
    createMessage(msg, 'darkblue', true)
});

socket.on('join', (msg) => {
    createMessage(msg, 'darkgreen')
});

socket.on('leave', (msg) => {
    createMessage(msg, 'red')
});

socket.on('peopleInChat', (msg) => {
    createMessage(msg, 'purple')
});

socket.on('selfMessage', (msg) => {
    createMessage(msg, 'black', true)
});



function createMessage(msg, color, bold) {
    const newMessage = document.createElement('div');
    newMessage.innerText = msg;
    newMessage.className = 'message'
    if (color) {
        newMessage.style.color = color;
    }
    if (bold) {
        newMessage.style.fontWeight = 'bold';
    }
    messageBox.appendChild(newMessage);
}