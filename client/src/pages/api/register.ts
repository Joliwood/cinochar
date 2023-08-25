import bcrypt from 'bcryptjs';
// import User from '../../models/User';
import connectToDatabase from '../../utils/mongo';

export default async function handler(req: any, res: any) {
  const { email, password, pseudo } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Veuillez remplir les champs s\'\'il vous plaît' });
  }

  const client = await connectToDatabase();
  const db = client.db();
  const collection = db.collection('players-ranking');

  const existingPseudo = await collection.findOne({ pseudo });
  const existingEmail = await collection.findOne({ email });

  if (existingPseudo) {
    return res.status(400).json({ message: 'Ce pseudo est déjà utilisé' });
  }
  if (existingEmail) {
    return res.status(400).json({ message: 'Cette adresse email est déjà enregistrée' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = {
    pseudo,
    email,
    points: 0,
    password: hashedPassword,
  };

  const newUser = await collection.insertOne(user);

  return res.status(201).json({ message: 'Votre compte a bien été créé' }, newUser);
}
