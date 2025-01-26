const users = [
    { username: "user1", password: "pass1" },
    { username: "user2", password: "pass2" },
    { username: "admin", password: "1234" }
];

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        window.location.href = 'welcome.html';
    } else {
        alert('Invalid username or password!');
    }
});