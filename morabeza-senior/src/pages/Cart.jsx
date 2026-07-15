import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { useCart } from '../context/CartContext.jsx';
import { formatPrice } from '../data/products.js';

export default function Cart() {
  const { items, updateQuantidade, removeItem, total } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <Container maxWidth="sm" sx={{ py: 10, textAlign: 'center' }}>
        <ShoppingCartOutlinedIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>O seu carrinho está vazio</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Explore a nossa loja e encontre os produtos que precisa.
        </Typography>
        <Button component={RouterLink} to="/loja" variant="contained" size="large">
          Ir para a Loja
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>Carrinho de Compras</Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          {items.map((item) => (
            <Paper key={item.id} variant="outlined" sx={{ p: 2, mb: 2 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={3} sm={2}>
                  <Box
                    component={RouterLink}
                    to={`/produto/${item.id}`}
                    sx={{ display: 'block' }}
                  >
                    <Box component="img" src={item.imagem} alt={item.nome} sx={{ width: '100%', borderRadius: 2 }} />
                  </Box>
                </Grid>
                <Grid item xs={9} sm={4}>
                  <Typography
                    component={RouterLink}
                    to={`/produto/${item.id}`}
                    sx={{ fontWeight: 600, textDecoration: 'none', color: 'text.primary' }}
                  >
                    {item.nome}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">{formatPrice(item.preco)} / unidade</Typography>
                </Grid>
                <Grid item xs={7} sm={3}>
                  <Box sx={{ display: 'flex', alignItems: 'center', border: 1, borderColor: 'divider', borderRadius: 2, width: 'fit-content' }}>
                    <IconButton
                      size="small"
                      aria-label={`Diminuir quantidade de ${item.nome}`}
                      onClick={() => updateQuantidade(item.id, item.quantidade - 1)}
                    >
                      <RemoveIcon fontSize="small" />
                    </IconButton>
                    <Typography sx={{ px: 1.5, minWidth: 24, textAlign: 'center' }}>{item.quantidade}</Typography>
                    <IconButton
                      size="small"
                      aria-label={`Aumentar quantidade de ${item.nome}`}
                      onClick={() => updateQuantidade(item.id, item.quantidade + 1)}
                    >
                      <AddIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Grid>
                <Grid item xs={4} sm={2}>
                  <Typography sx={{ fontWeight: 700 }}>{formatPrice(item.preco * item.quantidade)}</Typography>
                </Grid>
                <Grid item xs={1}>
                  <IconButton aria-label={`Remover ${item.nome} do carrinho`} onClick={() => removeItem(item.id)} color="error">
                    <DeleteOutlineIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Paper>
          ))}
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper variant="outlined" sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Resumo da Encomenda</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography>Subtotal</Typography>
              <Typography>{formatPrice(total)}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography>Envio</Typography>
              <Typography color="success.main">Grátis</Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>Total</Typography>
              <Typography variant="h6" color="primary.main" sx={{ fontWeight: 700 }}>{formatPrice(total)}</Typography>
            </Box>
            <Button
              fullWidth
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIcon />}
              onClick={() => navigate('/checkout')}
            >
              Finalizar Compra
            </Button>
            <Button fullWidth component={RouterLink} to="/loja" sx={{ mt: 1 }}>
              Continuar a Comprar
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
