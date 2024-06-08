import express from 'express';

const router = express.Router();

let posts = [
  { id: 1, title: 'First Post' },
  { id: 2, title: 'Second Post' },
  { id: 3, title: 'Third Post' },
];

// Get all posts
router.get('/', (req, res) => {
  const limit = parseInt(req.query.limit);
  const sort = req.query.sort;

  if (!isNaN(limit) && limit > 0 && sort === 'desc') {
    return res
      .status(200)
      .json([...posts].sort((a, b) => b.id - a.id).slice(0, limit));
  } else if (!isNaN(limit) && limit > 0) {
    return res.status(200).json(posts.slice(0, limit));
  } else if (sort === 'desc') {
    return res.status(200).json([...posts].sort((a, b) => b.id - a.id));
  }
  res.status(200).json(posts);
});

// Create new post
router.post('/', (req, res) => {
  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
  };

  if (!newPost.title) {
    return res.status(400).json({ msg: 'Please include a title' });
  }

  posts.push(newPost);
  res.status(201).json({ msg: 'New post created' });
});

// Get one post
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    return res
      .status(404)
      .json({ msg: `A post with the id of ${id} was not found` });
  }
  res.status(200).json(post);
});

// Update one post
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    return res
      .status(404)
      .json({ msg: `A post with the id of ${id} was not found` });
  }

  post.title = req.body.title;
  res.status(200).json({ msg: `Post with id ${id} was successfully updated` });
});

// Delete one post
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    return res
      .status(404)
      .json({ msg: `A post with the id of ${id} was not found` });
  }

  posts = posts.filter((post) => post.id !== id);
  res.status(200).json({ msg: `Post with id ${id} has been deleted` });
});

export default router;
