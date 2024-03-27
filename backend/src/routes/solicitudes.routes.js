import Router from 'express'
import Player from '../models/player.model.js'
import { authRequired } from '../middlewares/validateToken.js'
import { enviarSolicitud, aceptarSolicitud } from '../controllers/solicitudes.controller.js'
import multer from 'multer'

const storage = multer.memoryStorage();  // Almacenará la imagen en la memoria
const upload = multer({ storage: storage });

const router = Router()

router.post('/teams/:teamId/solicitar', authRequired, enviarSolicitud)

router.post('/teams/:teamId/aceptar/:playerId', authRequired, aceptarSolicitud)


export default router