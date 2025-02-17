document.addEventListener("DOMContentLoaded", () => {
    const messagesContainer = document.querySelector('#messages');
    const sendMessageForm = document.querySelector('#sendMessageForm');
    const userNameInput = sendMessageForm.querySelector('#userName');
    const messageText = sendMessageForm.querySelector('#messageText');
    let username = '';
    let id = '';
    messageText.focus();
    messageText.value = '';



    sendMessageForm.addEventListener('submit', e => {
        e.preventDefault();
        username = userNameInput.value.trim();
        const text = messageText.value.trim();
        if (text && username) {
            sendMessageForm.messageText.value = '';
            fetch(`/newMessage?username=${username}&text=${text}&id=${id ? id : null}`, {})
                .then(response => response.json())
                .then(data => {
                    messagesContainer.innerHTML = '';
                    id = data.id;
                    localStorage.setItem('id', id);
                    data.messages.forEach(message => {
                        messagesContainer.insertAdjacentHTML('beforeend', `
                            <div class="message-item ${message.id === id ? 'mine' : ''}">
                                ${message.text} <sub>by ${message.username}</sub>
                            </div>
                        `);
                    })
                })
        }
    });

    function getMessages() {
        fetch(`/getMessages`, {})
            .then(response => response.json())
            .then(data => {
                messagesContainer.innerHTML = '';
                data.forEach(message => {
                    messagesContainer.insertAdjacentHTML('beforeend', `
                            <div class="message-item ${message.id === id ? 'mine' : ''}">
                                ${message.text} <sub>by ${message.username}</sub>
                            </div>
                        `);
                });
                getMessages();
            })

    }

    function getMessagesLogin() {

        fetch(`/getMessagesLogin`, {})
            .then(response => response.json())
            .then(data => {
                messagesContainer.innerHTML = '';
                data.forEach(message => {
                    console.log(message)
                    messagesContainer.insertAdjacentHTML('beforeend', `
                            <div class="message-item ${message.id === id ? 'mine' : ''}">
                                ${message.text} <sub>by ${message.username}</sub>
                            </div>
                        `);
                });
                getMessages();
            })
    }

    id = localStorage.getItem('id');
    getMessagesLogin();
})


