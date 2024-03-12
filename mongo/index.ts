import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './src/routes/mainRouter';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3800;

app.use(cors({ 
  credentials: true,
  origin: process.env.CLIENT_URL,
  allowedHeaders: ['*'],
  methods: ['GET', 'POST'],
}));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI ?? '')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
