import { Request, Response } from 'express';
import getPlayersRanking from '../utils/getPlayersRanking';

export const getPlayersRankingController = async (req: Request, res: Response) => {
  try {
    const playersRanking = await getPlayersRanking();
    
    if (!playersRanking) {
      return res.status(404).json({ message: 'Cann\'t get players rankind, sorry' });
    }

    return res.status(200).json(playersRanking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while adding points.' });
  }
};
