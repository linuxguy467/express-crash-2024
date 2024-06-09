import express from 'express';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import api from './routes/index.js';
import logger from './middleware/logger.js';
import errorHandler from './middleware/error.js';
import notFound from './middleware/notFound.js';

const port = process.env.PORT || 5010;

// Get current path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Custom middleware
app.use(logger);

// setup static folder
app.use(express.static(join(__dirname, 'public')));

// API
app.use('/api', api);

// Error middleware
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`server is running on port ${port}`));
