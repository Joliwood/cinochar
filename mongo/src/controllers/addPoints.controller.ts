import { Request, Response } from 'express';
// import UserModel from '../models/user.model';
import { connectToDatabase } from '../utils/mongo';

import { ObjectId } from 'mongodb';
// import type { NextApiRequest, NextApiResponse } from 'next';
import type {
  Collection, Db, MongoClient,
} from 'mongodb';

export const addPointsController = async (req: Request, res: Response) => {
  const { userId, points } = req.body;
  console.log('req : ', req.body);

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required.' });
  }

  try {
    // const user = await UserModel.findByIdAndUpdate(userId, { $inc: { points: points } }, { new: true });
    const serverAction = await addPoints(userId, points);
    
    if (!serverAction) {
      return res.status(404).json({ message: 'User not found.' });
    }

    return res.status(200).json({ message: 'Points added.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while adding points.' });
  }
};

// import { ObjectId } from 'mongodb';
// import type { NextApiRequest, NextApiResponse } from 'next';
// import type {
//   Collection, Db, MongoClient,
// } from 'mongodb';

// import type { UserFromMongo } from '#types';
// import { connectToDatabase } from '#utils';

async function addPoints(userId: any, points: any): Promise<boolean> {

  const client: MongoClient = await connectToDatabase();
  const db: Db = client.db();
  const collection: Collection<any> = db.collection('players-ranking');

  await collection.updateOne(
    { _id: new ObjectId(userId) },
    { $inc: { points } },
  );

  return true;
}
