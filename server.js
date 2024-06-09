import express from 'express';
import { join } from 'node:path';
import api from './routes/index.js';
import logger from './middleware/logger.js';
import errorHandler from './middleware/error.js';
import notFound from './middleware/notFound.js';

const port = process.env.PORT || 5010;

const app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Custom middleware
app.use(logger);

// setup static folder
app.use(express.static(join(import.meta.dirname, 'public')));

// API
app.use('/api', api);

// Error middleware
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`server is running on port ${port}`));
