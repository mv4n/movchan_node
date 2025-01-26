document.getElementById('sum-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    const resultParagraph = document.getElementById('result');

    resultParagraph.textContent = 'Calculating...';

    setTimeout(() => {
        const sum = num1 + num2;
        resultParagraph.textContent = `Result: ${sum}`;
    }, 2000);
});