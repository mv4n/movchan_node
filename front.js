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

    function loadMessages() {
        fetch(`/getMessages`)
            .then(response => response.json())
            .then(data => {
                messagesContainer.innerHTML = '';
                data.forEach(message => {
                    const isMine = message.author === user ? 'mine' : '';
                    messagesContainer.insertAdjacentHTML('beforeend', `
                        <div class="message-item ${isMine}">
                            <strong>${message.author}</strong> <span>${message.time}</span>: ${message.message}
                        </div>
                    `);
                });
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            });
    }

    loadMessages();

    sendMessageForm.addEventListener('submit', e => {
        e.preventDefault();
        const message = messageText.value.trim();
        if (message) {
            sendMessageForm.messageText.value = '';
            fetch(`/newMessage?message=${encodeURIComponent(message)}&author=${encodeURIComponent(user)}`)
                .then(response => response.json())
                .then(() => loadMessages());
        }
    });

    setInterval(loadMessages, 1000);
});
