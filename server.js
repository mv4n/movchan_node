import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());

app.get('/api/someData', (req, res) => {
    const a = req.query.a;
    const b = req.query.b;
    const result = parseInt(a) + parseInt(b);
    res.json({ result: result });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
