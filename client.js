import avatars from './avatars.js';
// Client port: 5500
// Server port: 3000
const socket = io('http://localhost:3000');
const msgForm = document.querySelector('#msgForm');
const msgInput = document.querySelector('#msgInput')
const chatlog = document.querySelector('#chatlog');
const myAvatar = document.querySelector('#myAvatar');
const avatarModal = document.querySelector('.avatarModal');
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
    const newMsgBox = document.createElement('div');
    // newMsgBox.classList.add('msgBox');
    newMsgBox.classList.add('msg');    

    if(self) {
        newMsgBox.classList.add('myMsg');
    } else {
        newMsgBox.classList.add('otherMsg');
        const msgAvatar = document.createElement('img');
        msgAvatar.classList.add('avatar');
        msgAvatar.classList.add('otherAvatar');
        newMsgBox.appendChild(msgAvatar);
    }
    
    const newMsgText = document.createElement('p');
    newMsgText.innerText = msg;

    newMsgBox.appendChild(newMsgText)
    chatlog.appendChild(newMsgBox);
}

function populateModal() {
    avatars.forEach(a => {
        const newAv = document.createElement('img');
        newAv.classList.add('avatar');
        newAv.setAttribute('alttext', a.name);

        avatarModal.appendChild(newAv);
    })
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

myAvatar.addEventListener('click', () => {
    avatarModal.classList.toggle('hidden');
});

populateModal();