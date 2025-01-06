// Client port: 5500
// Server port: 3000
const socket = io('http://localhost:3000');

const msgForm = document.querySelector('#msgForm');
const msgInput = document.querySelector('#msgInput')
const chatlog = document.querySelector('#chatlog');
let userName = 'Joker';

promptUser();


// #####
// FUNCTIONS
// #####

// Ask user for name
function promptUser() {
    appendMsg('You joined');
    socket.emit('new-user', userName);    
}

// Adds message to chatlog element
function appendMsg(msg) {
    const newMsg = document.createElement('p');
    newMsg.innerText = msg;
    chatlog.appendChild(newMsg);
}

// ##### 
// SOCKET MESSAGES
// #####

socket.on('chat-msg', (data) => {
    appendMsg(`${data.user}: ${data.msg}`);
})

socket.on('user-connected', user => {
    appendMsg(user + ' connected')
})

socket.on('user-disconnected', user => {
    appendMsg(user + ' disconnected')
})

// #####
// EVENT LISTENERS
// #####

// To server: send-chat-msg
msgForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent page reload on form submit

    const msg = msgInput.value; // get message text
    socket.emit('send-chat-msg', msg); // send to server
    msgInput.value = ""; // clear input box
    appendMsg('You: ' + msg); // add message to screen (local)
})