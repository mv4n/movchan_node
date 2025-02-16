const API_URL = 'http://localhost:3000/api/someData';
const form = document.querySelector('#form');
const answerP = document.querySelector('#answer');
const discriminantP = document.querySelector('#discriminant');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const a = form.querySelector('#a').value;
    const b = form.querySelector('#b').value;
    const c = form.querySelector('#c').value;

    const preloader = document.createElement('img');
    preloader.src = 'img/preloader.gif';
    document.body.appendChild(preloader);

    if (a !== '' && b !== '' && c !== '') {
        let url = `${API_URL}?a=${a}&b=${b}&c=${c}`;

        fetch(url)
            .then(res => res.json())
            .then(data => {
                setTimeout(() => {
                    preloader.remove();
                    discriminantP.textContent = `Discriminant: ${data.discriminant}`;
                    if (data.roots.length === 0) {
                        answerP.textContent = 'No real roots.';
                    } else if (data.roots.length === 1) {
                        answerP.textContent = `One root: ${data.roots[0]}`;
                    } else {
                        answerP.textContent = `Two roots: ${data.roots[0]} and ${data.roots[1]}`;
                    }
                }, 2000);
            })
            .catch(error => {
                preloader.remove();
                answerP.textContent = 'Something went wrong';
            });
    }
});
