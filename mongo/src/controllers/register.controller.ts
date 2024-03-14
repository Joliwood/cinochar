import { type Request, type Response } from 'express';

import register from '../utils/register';

export const registerController = async (req: Request, res: Response) => {
  try {
    const response = await register(req, res);

    if (!response) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(201).json({ message: 'Votre compte a bien été créé' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred while user infos reeding infos.' });
  }
};
