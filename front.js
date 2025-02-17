document.addEventListener("DOMContentLoaded", () => {
    const messagesContainer = document.querySelector('#messages');
    const sendMessageForm = document.querySelector('#sendMessageForm');
    const messageText = sendMessageForm.querySelector('#messageText');

    messageText.focus();
    messageText.value = '';

    sendMessageForm.addEventListener('submit', e => {
        e.preventDefault();
        const message = messageText.value.trim();
        if (message) {
            sendMessageForm.messageText.value = '';
            fetch(`/newMessage?message=${message}`, {})
                .then(response => response.json())
                .then(data => {
                    messagesContainer.innerHTML = '';
                    data.forEach(message => {
                        messagesContainer.insertAdjacentHTML('beforeend',`
                            <div class="message-item">${message}</div>
                        ` );
                    })

                });
        }
    });

    setInterval(() => {
        fetch(`/getMessages`, {})
            .then(response => response.json())
            .then(data => {
                console.log(data);
                messagesContainer.innerHTML = '';
                data.forEach(message => {
                    messagesContainer.insertAdjacentHTML('beforeend',`
                            <div class="message-item">${message}</div>
                        ` );
                })

            });
    }, 1000)
})


