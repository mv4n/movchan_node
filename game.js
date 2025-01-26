import fs from 'fs';
import readline from 'readline';

const rand = Math.floor(Math.random() * 10) + 1;
let count = 0;

function saveResult(attempts, targetNumber) {
    const result = (`Кількість спроб: ${attempts}, Загадане число: ${targetNumber} `);

    if (fs.existsSync('hw3.txt')) {
        const data = JSON.parse(fs.readFileSync('hw3.txt', 'utf8'));
        data.push(result);
        fs.writeFileSync('hw3.txt', JSON.stringify(data, null, 2));
    } else {
        fs.writeFileSync('hw3.txt', JSON.stringify([result], null, 2));
    }
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askQuestion() {
    rl.question('Введіть ваше число: ', (input) => {
        const usernumber = parseInt(input, 10);
        count++;

        if (isNaN(usernumber)) {
            console.log('Будь ласка, введіть коректне число.');
        } else if (usernumber < rand) {
            console.log('Загадане число більше.');
        } else if (usernumber > rand) {
            console.log('Загадане число менше.');
        } else {
            console.log(`Ви вгадали число ${rand} за ${count} спроб!`);
            saveResult(count, rand);
            rl.close();
            return;
        }

        askQuestion();
    });
}

console.log('Гра "Відгадай число". Введіть число від 1 до 10.');
askQuestion();
