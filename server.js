const express = require('express');
const path = require('path');

const app = express();

// setup static folder
app.use(express.static(path.join(__dirname, 'public')));

let posts = [
  { id: 1, title: 'First Post' },
  { id: 2, title: 'Second Post' },
  { id: 3, title: 'Third Post' },
];

app.get('/api/posts', (req, res) => {
  res.json(posts);
});

app.listen(5010, () => console.log(`server is running on port 5010`));
