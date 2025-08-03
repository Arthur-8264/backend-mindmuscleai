import express from 'express';
import {
  obterPerfil,
  atualizarPerfil
} from '../controllers/meuPerfilController.js';

const router = express.Router();

router.get('/:id', obterPerfil);         // Ver perfil
router.put('/:id', atualizarPerfil);     // Atualizar perfil (exceto data_nascimento)

export default router;
