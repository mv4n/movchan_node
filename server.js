import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());


app.get('/api/someData', (req, res) => {
    const { a, b, c } = req.query;

    if (a && b && c) {
        const numA = parseFloat(a);
        const numB = parseFloat(b);
        const numC = parseFloat(c);

        const discriminant = numB * numB - 4 * numA * numC;
        let roots = [];

        if (discriminant > 0) {
            const root1 = (-numB + Math.sqrt(discriminant)) / (2 * numA);
            const root2 = (-numB - Math.sqrt(discriminant)) / (2 * numA);
            roots = [root1, root2];
        } else if (discriminant === 0) {
            const root = -numB / (2 * numA);
            roots = [root];
        }

        res.json({
            discriminant: discriminant,
            roots: roots
        });
    } else {
        res.status(400).send('Missing parameters');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
