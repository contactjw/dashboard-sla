const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();

app.use(cors());
app.use(express.json());

const dataFilePath = 'data.json';

app.get('/data', (req, res) => {
  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Server error');
    }
    res.json(JSON.parse(data));
  });
});

app.post('/data', (req, res) => {
  const newData = req.body;
  fs.writeFile(dataFilePath, JSON.stringify(newData, null, 2), 'utf8', (err) => {
    if (err) {
      return res.status(500).send('Server error');
    }
    res.send('Data saved successfully');
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
