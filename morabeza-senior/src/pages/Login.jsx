import { useState } from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
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

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: '', password: '' });
  const [erro, setErro] = useState('');

  const destino = location.state?.from?.pathname || '/';

  const handleSubmit = (e) => {
    e.preventDefault();
    const resultado = login(form);
    if (resultado.ok) {
      navigate(destino, { replace: true });
    } else {
      setErro(resultado.erro);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ py: 8 }}>
      <Paper variant="outlined" sx={{ p: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, textAlign: 'center' }}>
          Entrar na sua Conta
        </Typography>

        {erro && <Alert severity="error" sx={{ mb: 2 }}>{erro}</Alert>}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Email" type="email" fullWidth required margin="normal"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <TextField
            label="Palavra-passe" type="password" fullWidth required margin="normal"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <Button type="submit" variant="contained" size="large" fullWidth sx={{ mt: 2 }}>
            Entrar
          </Button>
        </Box>

        <Divider sx={{ my: 3 }} />
        <Typography variant="body2" sx={{ textAlign: 'center', mb: 1 }}>
          Ainda não tem conta?{' '}
          <Link component={RouterLink} to="/registo">Criar conta</Link>
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center' }}>
          Conta de demonstração do backoffice: admin@morabezasenior.cv / admin123
        </Typography>
      </Paper>
    </Container>
  );
}
