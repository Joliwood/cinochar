import { Request, Response } from 'express';
import addPoints from '../utils/addPoints';

export const addPointsController = async (req: Request, res: Response) => {
  const { userId, points } = req.body;
  console.log('req : ', req.body);

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required.' });
  }

  try {
    const response = await addPoints(userId, points);
    
    if (!response) {
      return res.status(404).json({ message: 'User not found.' });
    }

    return res.status(200).json({ message: 'Points added.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while adding points.' });
  }
};
