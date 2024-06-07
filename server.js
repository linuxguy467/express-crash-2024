const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/about', (req, res) => {
  res.send('About');
});

app.listen(5010, () => console.log(`server is running on port 5010`));
