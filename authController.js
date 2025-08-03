// controllers/authController.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { supabase } from '../config/supabaseClient.js';

const JWT_SECRET = process.env.JWT_SECRET || 'seusegredoaqui';

export const registrar = async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
  }

  const { data: usuarioExistente } = await supabase
    .from('usuarios')
    .select('*')
    .eq('email', email)
    .single();

  if (usuarioExistente) {
    return res.status(409).json({ error: 'Usuário já existe.' });
  }

  const senhaCriptografada = await bcrypt.hash(senha, 10);

  const { data, error } = await supabase
    .from('usuarios')
    .insert([{ email, senha: senhaCriptografada }]);

  if (error) {
    return res.status(500).json({ error: 'Erro ao registrar usuário.' });
  }

  res.status(201).json({ mensagem: 'Usuário registrado com sucesso.' });
};

export const login = async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
  }

  const { data: usuario } = await supabase
    .from('usuarios')
    .select('*')
    .eq('email', email)
    .single();

  if (!usuario) {
    return res.status(404).json({ error: 'Usuário não encontrado.' });
  }

  const senhaValida = await bcrypt.compare(senha, usuario.senha);
  if (!senhaValida) {
    return res.status(401).json({ error: 'Senha inválida.' });
  }

  const token = jwt.sign({ id: usuario.id, email: usuario.email }, JWT_SECRET, {
    expiresIn: '3h',
  });

  res.json({ token });
};
