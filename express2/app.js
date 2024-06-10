import express from 'express';
import { join } from 'node:path';

const port = process.env.EXPRESS2_SERVER_PORT || 5011;
const app = express();

// Config EJS
app.set('views', join(import.meta.dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', {
    title: 'My Website',
    message: 'Hello from EJS',
    people: ['John', 'Jane', 'Jack'],
  });
});

app.listen(port, console.log(`Server started on port ${port}`));
