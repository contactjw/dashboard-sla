import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';

const app = express();
const port = 3001;

app.use(cors()); // Enable CORS for all routes
app.use(express.json());

app.get('/api/data', async (req, res) => {
  try {
    const filePath = path.join(__dirname, '..', 'src', 'assets', 'data.json');
    const data = await fs.readFile(filePath, 'utf-8');
    res.json(JSON.parse(data));
  } catch (error) {
    console.error('Failed to fetch data', error);
    res.status(500).send('Failed to fetch data'); 
  }
});

app.post('/api/save', async (req, res) => {
  try {
    const filePath = path.join(__dirname, '..', 'src', 'assets', 'data.json');
    await fs.writeFile(filePath, JSON.stringify(req.body, null, 2));
    res.status(200).send('Data saved successfully');
  } catch (error) {
    console.error('Failed to save data', error);
    res.status(500).send('Failed to save data');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
