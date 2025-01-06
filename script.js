const sendBtn = document.querySelector(".sendBtn");
const userInput = document.querySelector('.userInput');
const chatlog = document.querySelector(".chatlog");
const inputForm = document.querySelector('.inputForm');

function addNewMsg(e) {
    e.preventDefault()
    const newMsg = document.createElement('div');
    newMsg.classList.add('message-box');

    const msgAvatar = document.createElement('div');
    msgAvatar.classList.add('avatar');

    const msgBackground = document.createElement('div');
    msgBackground.classList.add('background');

    const msgText = document.createElement('p');
    msgText.innerText = userInput.value;

    userInput.value = "";

    newMsg.appendChild(msgBackground);
    newMsg.appendChild(msgAvatar);
    newMsg.appendChild(msgText);
    chatlog.appendChild(newMsg);

    chatlog.scrollTop = chatlog.scrollHeight;
}

inputForm.addEventListener('submit', addNewMsg);