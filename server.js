const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(5010, () => console.log(`server is running on port 5010`));
