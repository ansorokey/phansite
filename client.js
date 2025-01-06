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
    appendMsg('Welcome, phantom', true);
    socket.emit('new-user', userName);    
}

// Adds message to chatlog element
function appendMsg(msg, self=false) {
    const newMsg = document.createElement('p');
    if(self) {
        newMsg.classList.add('myMsg');
    } else {
        newMsg.classList.add('otherMsg');
    }
    newMsg.classList.add('msg');
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
    if (msg.trim().length === 0) {
        msgInput.value = ""; // clear input box
        return; // prevent empty message  
    } 

    socket.emit('send-chat-msg', msg); // send to server
    msgInput.value = ""; // clear input box
    appendMsg(msg, true); // add message to screen (local)
})