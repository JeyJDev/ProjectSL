import { Router } from 'express'
import { authRequired } from '../middlewares/validateToken.js'
import { getTeams } from '../controllers/team.controller.js'

const router = Router()

router.get('/teams', authRequired, getTeams)

export default router