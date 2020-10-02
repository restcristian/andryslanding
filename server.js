const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/contact', (req, res) => {
  console.log('application sent');
  res.status(200);
});

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
