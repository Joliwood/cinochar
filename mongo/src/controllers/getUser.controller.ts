import { type Request, type Response } from 'express';

import getUser from '../utils/getUser';

export const getUserController = async (req: Request, res: Response) => {
  try {
    const user = await getUser(req);

    if (!user) {
      return res.status(404).json({ message: 'Cann\'t find the user informations' });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred while user infos reeding infos.' });
  }
};
