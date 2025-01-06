const sendBtn = document.querySelector(".sendBtn");
const userInput = document.querySelector('.userInput');
const chatlog = document.querySelector(".chatlog");
const inputForm = document.querySelector('.inputForm');
const changeAvatarBtn = document.querySelector('.changeAvatarBtn')
const avatarModal = document.querySelector('.avatarModal');

const avatars = [
    'Ryuji',
    'Ann',
    'Yusuke',
    'Makoto',
    'Futaba',
    'Haru',
    'Takemi',
    'Mishima',
    'Ohya',
    'Akechi',
    'Sojiro'
]

function addNewMsg(e) {
    e.preventDefault()

    // No empty messages
    if (userInput.value.length === 0) return;

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

function populateModal() {

} 

function showModal() {

    avatars.forEach((a) => {        
        let avImg = document.createElement('p');
        avImg.innerText = a;

        avImg.addEventListener('click', () => {
            inputForm.querySelector('.avatar').innerText = avImg.innerText;
            avatarModal.style.display = 'none';
        })

        avatarModal.appendChild(avImg);
    });

    avatarModal.style.display = 'grid';
}

inputForm.addEventListener('submit', addNewMsg);
changeAvatarBtn.addEventListener('click', showModal);
