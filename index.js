import express from 'express';
import { JSONFilePreset } from 'lowdb/node';

// check also with sqlite3

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Starting server at ${port}`));
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

const defaultData = { students: [] };
const db = await JSONFilePreset('public/db.json', defaultData);

app.post('/api', (request, response) => {
    db.data = request.body;
    db.write();
    response.json({
        status: "success"
    })
})