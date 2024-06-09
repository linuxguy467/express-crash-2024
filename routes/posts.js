import express from 'express';

const router = express.Router();

let posts = [
  { id: 1, title: 'First Post' },
  { id: 2, title: 'Second Post' },
  { id: 3, title: 'Third Post' },
];

// Get all posts
router.get('/', (req, res, next) => {
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
router.post('/', (req, res, next) => {
  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
  };

  if (!newPost.title) {
    const error = new Error('Please include a title');
    error.status = 400;
    return next(error);
  }

  posts.push(newPost);
  res.status(201).json({ msg: 'New post created' });
});

// Get one post
router.get('/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    const error = new Error(`A post with the id of ${id} was not found`);
    error.status = 404;
    return next(error);
  }
  res.status(200).json(post);
});

// Update one post
router.put('/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    const error = new Error(`A post with the id of ${id} was not found`);
    error.status = 404;
    return next(error);
  }

  post.title = req.body.title;
  res.status(200).json({ msg: `Post with id ${id} was successfully updated` });
});

// Delete one post
router.delete('/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    const error = new Error(`A post with the id of ${id} was not found`);
    error.status = 404;
    return next(error);
  }

  posts = posts.filter((post) => post.id !== id);
  res.status(200).json({ msg: `Post with id ${id} has been deleted` });
});

export default router;
