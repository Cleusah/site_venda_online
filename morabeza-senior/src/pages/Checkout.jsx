import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { useCart } from '../context/CartContext.jsx';
import { formatPrice } from '../data/products.js';

const passos = ['Entrega', 'Pagamento', 'Confirmação'];

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [passoAtivo, setPassoAtivo] = useState(0);
  const [concluido, setConcluido] = useState(false);
  const [morada, setMorada] = useState({ nome: '', telefone: '', endereco: '', cidade: '', ilha: 'Santiago' });
  const [pagamento, setPagamento] = useState('cartao');

  if (items.length === 0 && !concluido) {
    return <Navigate to="/carrinho" replace />;
  }

  const avancar = () => setPassoAtivo((p) => p + 1);
  const voltar = () => setPassoAtivo((p) => p - 1);

  const finalizarEncomenda = () => {
    setConcluido(true);
    clearCart();
  };

  if (concluido) {
    return (
      <Container maxWidth="sm" sx={{ py: 10, textAlign: 'center' }}>
        <CheckCircleIcon sx={{ fontSize: 90, color: 'success.main', mb: 2 }} />
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>Encomenda Confirmada!</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Obrigado, {morada.nome || 'cliente'}. Vamos entrar em contacto para confirmar a entrega em {morada.cidade || 'sua morada'}.
        </Typography>
        <Button variant="contained" size="large" onClick={() => navigate('/loja')}>
          Continuar a Comprar
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>Checkout</Typography>
      <Stepper activeStep={passoAtivo} sx={{ mb: 4 }} alternativeLabel>
        {passos.map((label) => (
          <Step key={label}><StepLabel>{label}</StepLabel></Step>
        ))}
      </Stepper>

      <Paper variant="outlined" sx={{ p: { xs: 2, sm: 4 } }}>
        {passoAtivo === 0 && (
          <Box component="form" onSubmit={(e) => { e.preventDefault(); avancar(); }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Dados de Entrega</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Nome completo" fullWidth required
                  value={morada.nome}
                  onChange={(e) => setMorada({ ...morada, nome: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Telefone" fullWidth required
                  value={morada.telefone}
                  onChange={(e) => setMorada({ ...morada, telefone: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Endereço" fullWidth required
                  value={morada.endereco}
                  onChange={(e) => setMorada({ ...morada, endereco: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Cidade" fullWidth required
                  value={morada.cidade}
                  onChange={(e) => setMorada({ ...morada, cidade: e.target.value })}
                />
              </Grid>
            </Grid>
            <Button type="submit" variant="contained" size="large" sx={{ mt: 3 }}>
              Continuar para Pagamento
            </Button>
          </Box>
        )}

        {passoAtivo === 1 && (
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Método de Pagamento</Typography>
            <RadioGroup value={pagamento} onChange={(e) => setPagamento(e.target.value)}>
              <FormControlLabel value="cartao" control={<Radio />} label="Cartão de Crédito/Débito" />
              <FormControlLabel value="multibanco" control={<Radio />} label="Referência Multibanco" />
              <FormControlLabel value="dinheiro" control={<Radio />} label="Dinheiro na Entrega" />
            </RadioGroup>
            <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
              <Button onClick={voltar}>Voltar</Button>
              <Button variant="contained" size="large" onClick={avancar}>Rever Encomenda</Button>
            </Box>
          </Box>
        )}

        {passoAtivo === 2 && (
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Rever e Confirmar</Typography>
            {items.map((item) => (
              <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>{item.quantidade}x {item.nome}</Typography>
                <Typography>{formatPrice(item.preco * item.quantidade)}</Typography>
              </Box>
            ))}
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>Total</Typography>
              <Typography variant="h6" color="primary.main" sx={{ fontWeight: 700 }}>{formatPrice(total)}</Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Entregar a: {morada.nome} — {morada.endereco}, {morada.cidade}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Pagamento: {pagamento === 'cartao' ? 'Cartão de Crédito/Débito' : pagamento === 'multibanco' ? 'Referência Multibanco' : 'Dinheiro na Entrega'}
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button onClick={voltar}>Voltar</Button>
              <Button variant="contained" size="large" color="secondary" onClick={finalizarEncomenda}>
                Confirmar Encomenda
              </Button>
            </Box>
          </Box>
        )}
      </Paper>
    </Container>
  );
}
