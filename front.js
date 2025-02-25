document.addEventListener("DOMContentLoaded", () => {
    const messagesContainer = document.querySelector('#messages');
    const sendMessageForm = document.querySelector('#sendMessageForm');
    const messageText = sendMessageForm.querySelector('#messageText');
    const usernameInput = sendMessageForm.querySelector('#username');

    let user = localStorage.getItem('username');

    if (!user || user === 'null') {
        user = prompt('Enter your username:');
        if (user && user.trim()) {
            localStorage.setItem('username', user);
        } else {
            user = 'Guest';
            localStorage.setItem('username', user);
        }
    }

    usernameInput.value = user;
    messageText.focus();
    messageText.value = '';

    const socket = new WebSocket(`ws://${window.location.host}`);

    socket.onopen = () => {
        console.log('Connected to WebSocket server');
    };

    socket.onmessage = event => {
        const data = JSON.parse(event.data);

        if (data.type === 'history') {
            messagesContainer.innerHTML = '';
            data.messages.forEach(message => addMessage(message));
        }

        if (data.type === 'message') {
            addMessage(data.message);
        }
    };

    sendMessageForm.addEventListener('submit', e => {
        e.preventDefault();
        const message = messageText.value.trim();
        if (message) {
            const msgData = {
                type: 'message',
                author: user,
                message: message,
            };
            socket.send(JSON.stringify(msgData));
            messageText.value = '';
        }
    });

    function addMessage(message) {
        const isMine = message.author === user ? 'mine' : '';
        messagesContainer.insertAdjacentHTML('beforeend', `
            <div class="message-item ${isMine}">
                <strong>${message.author}</strong> <span>${message.time}</span>: ${message.message}
            </div>
        `);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
});
