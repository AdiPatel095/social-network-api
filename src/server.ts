// src/server.ts

import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import routes from './routes';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware for JSON parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/');


// Optional: Log mongo queries being executed
mongoose.set('debug', true);

// Use routes
app.use(routes);

// Fallback for unknown routes
app.use((req: Request, res: Response) => res.status(404).send('Route not found'));

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));
