const express = require('express');
const path = require('path');
const api = require('./routes');

const port = process.env.PORT || 5010;

const app = express();

// setup static folder
app.use(express.static(path.join(__dirname, 'public')));

// API
app.use('/api', api);

app.listen(port, () => console.log(`server is running on port ${port}`));
