const express = require('express');
const path = require('path');

const port = process.env.PORT || 5010;

const app = express();

// setup static folder
app.use(express.static(path.join(__dirname, 'public')));

let posts = [
  { id: 1, title: 'First Post' },
  { id: 2, title: 'Second Post' },
  { id: 3, title: 'Third Post' },
];

app.get('/api/posts', (req, res) => {
  const limit = parseInt(req.query.limit);
  const sort = req.query.sort;

  if (!isNaN(limit) && limit > 0 && sort === 'desc') {
    res.json([...posts].sort((a, b) => b.id - a.id).slice(0, limit));
  } else if (!isNaN(limit) && limit > 0) {
    res.json(posts.slice(0, limit));
  } else if (sort === 'desc') {
    res.json([...posts].sort((a, b) => b.id - a.id));
  } else {
    res.json(posts);
  }
});

app.get('/api/posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  res.json(post);
});

app.listen(port, () => console.log(`server is running on port ${port}`));
