import express, { type Router } from 'express';

import { addPointsController } from '../controllers/addPoints.controller';
import { getFilmController } from '../controllers/getFilm.controller';
import { getPlayersRankingController } from '../controllers/getPlayersRanking.controller';
import { getUserController } from '../controllers/getUser.controller';
import { loginController } from '../controllers/login.controller';
import { registerController } from '../controllers/register.controller';

const router: Router = express.Router();
const baseUrl = '/mongo';

router.use(`${baseUrl}/addPoints`, addPointsController);
router.use(`${baseUrl}/getFilm`, getFilmController);
router.use(`${baseUrl}/getPlayersRanking`, getPlayersRankingController);
router.use(`${baseUrl}/getUser`, getUserController);
router.use(`${baseUrl}/login`, loginController);
router.use(`${baseUrl}/register`, registerController);

export default router;
