import { type Request, type Response } from 'express';

import getFilm from '../utils/getFilm';

export const getFilmController = async (req: Request, res: Response) => {
  try {
    const newFilm = await getFilm();

    if (!newFilm) {
      return res.status(404).json({ message: 'Cann\'t find a new film' });
    }

    return res.status(200).json(newFilm);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred while adding points.' });
  }
};
