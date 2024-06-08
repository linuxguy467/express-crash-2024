const express = require('express');
const path = require('path');

const app = express();

// setup static folder
app.use(express.static(path.join(__dirname, 'public')));

app.listen(5010, () => console.log(`server is running on port 5010`));
