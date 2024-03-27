import { Router } from "express";
import { registerPlayer, registerTeam, login, logout, verifyToken, profile } from "../controllers/auth.controllers.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { registerPlayerSchema, registerTeamSchema, loginSchema } from "../schemas/auth.schema.js";
import { uploadImage } from "../controllers/player.controller.js";

import multer from "multer";
const upload = multer();

const router = Router() 


router.post('/register-player', validateSchema(registerPlayerSchema), registerPlayer)
router.post('/register-team', validateSchema(registerTeamSchema), registerTeam)
router.post('/login', validateSchema(loginSchema),login)
router.post('/logout', logout)
router.get('/verify', verifyToken)
router.get('/profile', authRequired, profile)


router.post('/upload-image', upload.single('image'), uploadImage);

export default router