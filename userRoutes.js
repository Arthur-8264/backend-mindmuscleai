// routes/userRoutes.js
import express from 'express';
import { obterUsuarioPorId, atualizarUsuario } from '../controllers/userController.js';

const router = express.Router();

router.get('/:id', obterUsuarioPorId);
router.put('/:id', atualizarUsuario);

export default router;
