import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';

import { useAuth } from '../context/AuthContext.jsx';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ nome: '', email: '', password: '', confirmar: '' });
  const [erro, setErro] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmar) {
      setErro('As palavras-passe não coincidem.');
      return;
    }
    if (form.password.length < 6) {
      setErro('A palavra-passe deve ter pelo menos 6 caracteres.');
      return;
    }
    const resultado = register(form);
    if (resultado.ok) {
      navigate('/conta');
    } else {
      setErro(resultado.erro);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ py: 8 }}>
      <Paper variant="outlined" sx={{ p: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, textAlign: 'center' }}>
          Criar Conta
        </Typography>

        {erro && <Alert severity="error" sx={{ mb: 2 }}>{erro}</Alert>}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Nome completo" fullWidth required margin="normal"
            value={form.nome}
            onChange={(e) => setForm({ ...form, nome: e.target.value })}
          />
          <TextField
            label="Email" type="email" fullWidth required margin="normal"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <TextField
            label="Palavra-passe" type="password" fullWidth required margin="normal"
            helperText="Mínimo 6 caracteres"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <TextField
            label="Confirmar Palavra-passe" type="password" fullWidth required margin="normal"
            value={form.confirmar}
            onChange={(e) => setForm({ ...form, confirmar: e.target.value })}
          />
          <Button type="submit" variant="contained" size="large" fullWidth sx={{ mt: 2 }}>
            Criar Conta
          </Button>
        </Box>

        <Divider sx={{ my: 3 }} />
        <Typography variant="body2" sx={{ textAlign: 'center' }}>
          Já tem conta?{' '}
          <Link component={RouterLink} to="/login">Entrar</Link>
        </Typography>
      </Paper>
    </Container>
  );
}
