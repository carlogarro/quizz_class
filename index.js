import express from 'express';
import { JSONFilePreset } from 'lowdb/node';

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Starting server at ${port}`));
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

const defaultData = { students: [] };
const db = await JSONFilePreset('db.json', defaultData);


app.post('/api', (request, response) => {
    console.log(request.body);
    db.data = request.body;
    db.write();
    response.json({
        status: "success"
    })
})