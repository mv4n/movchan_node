const API_URL = 'http://localhost:3000/api/someData';
const form = document.querySelector('#form');
const answerP = document.querySelector('#answer');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const a = form.querySelector('#a').value;
    const b = form.querySelector('#b').value;

    const preloader = document.createElement('img');
    preloader.src = 'img/preloader.gif';
    document.body.appendChild(preloader);

    if (a !== '' && b !== '') {
        let url = `${API_URL}?a=${a}&b=${b}`;

        fetch(url)
            .then(res => res.json())
            .then(data => {
                setTimeout(() => {
                    preloader.remove();
                    answerP.textContent = data.result;
                }, 2000);
            })
            .catch(error => {
                preloader.remove();
                answerP.textContent = 'Something went wrong';
            });
    }
});
