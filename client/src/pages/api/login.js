import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connectToDatabase from '../../utils/mongo';

export default async function handler(req, res) {
  const { email, password } = req.body;

  // Fetch user from the database based on the email
  const client = await connectToDatabase();
  const db = client.db();
  const collection = db.collection('players-ranking');
  const user = await collection.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Compare provided password with the hashed password in the database
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Generate a JWT
  const tokenPayload = {
    userId: user._id,
  };

  const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION_TIME,
  });

  return res.status(200).json({ message: 'Login successful', user, token });
}
