import express, { Router } from 'express';
import { addPointsController } from '../controllers/addPoints.controller';

const router: Router = express.Router();
const baseUrl = '/mongo';

router.use(`${baseUrl}/addPoints`, addPointsController);

export default router;