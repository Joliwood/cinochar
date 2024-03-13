import { type Request, type Response } from 'express';

import login from '../utils/login';

export const loginController = async (req: Request, res: Response) => {
  try {
    const response = await login(req);

    if (!response) {
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('response', response);

    // if (!response.token || !response.user) {
    //   return res.status(401).json({ message: response.message });
    // }

    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred while user infos reeding infos.' });
  }
};
