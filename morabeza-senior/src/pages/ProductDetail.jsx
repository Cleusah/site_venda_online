import { useState } from 'react';
import { useParams, Link as RouterLink, useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';

import { getProductById, formatPrice } from '../data/products.js';
import { categories } from '../data/categories.js';
import { useCart } from '../context/CartContext.jsx';
import NotFound from './NotFound.jsx';

export default function ProductDetail() {
  const { id } = useParams();
  const produto = getProductById(id);
  const { addItem } = useCart();
  const navigate = useNavigate();
  const [quantidade, setQuantidade] = useState(1);
  const [snackbar, setSnackbar] = useState(false);

  if (!produto) return <NotFound />;

  const categoriaInfo = categories.find((c) => c.id === produto.categoria);
  const semStock = produto.stock === 0;

  const handleAdicionar = () => {
    addItem(produto, quantidade);
    setSnackbar(true);
  };

  const handleComprarAgora = () => {
    addItem(produto, quantidade);
    navigate('/checkout');
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link component={RouterLink} to="/" underline="hover" color="inherit">Início</Link>
        <Link component={RouterLink} to="/loja" underline="hover" color="inherit">Loja</Link>
        {categoriaInfo && (
          <Link component={RouterLink} to={`/loja?categoria=${categoriaInfo.id}`} underline="hover" color="inherit">
            {categoriaInfo.nome}
          </Link>
        )}
        <Typography color="text.primary">{produto.nome}</Typography>
      </Breadcrumbs>

      <Grid container spacing={5}>
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src={produto.imagem}
            alt={produto.nome}
            sx={{ width: '100%', borderRadius: 3, boxShadow: 2 }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>{produto.nome}</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Rating value={produto.avaliacao} precision={0.1} readOnly />
            <Typography variant="body2" color="text.secondary">({produto.avaliacao})</Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 2, mb: 2 }}>
            <Typography variant="h4" color="primary.main" sx={{ fontWeight: 700 }}>
              {formatPrice(produto.preco)}
            </Typography>
            {produto.precoAntigo && (
              <Typography variant="h6" sx={{ textDecoration: 'line-through', color: 'text.secondary' }}>
                {formatPrice(produto.precoAntigo)}
              </Typography>
            )}
          </Box>

          {semStock ? (
            <Chip label="Produto esgotado" color="error" sx={{ mb: 2 }} />
          ) : (
            <Chip label={`${produto.stock} em stock`} color="success" variant="outlined" sx={{ mb: 2 }} />
          )}

          <Typography variant="body1" sx={{ mb: 3 }}>{produto.descricao}</Typography>

          {!semStock && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Quantidade:</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', border: 1, borderColor: 'divider', borderRadius: 2 }}>
                <IconButton
                  aria-label="Diminuir quantidade"
                  onClick={() => setQuantidade((q) => Math.max(1, q - 1))}
                >
                  <RemoveIcon />
                </IconButton>
                <Typography sx={{ px: 2, minWidth: 32, textAlign: 'center' }}>{quantidade}</Typography>
                <IconButton
                  aria-label="Aumentar quantidade"
                  onClick={() => setQuantidade((q) => Math.min(produto.stock, q + 1))}
                >
                  <AddIcon />
                </IconButton>
              </Box>
            </Box>
          )}

          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 4 }}>
            <Button
              variant="outlined"
              size="large"
              startIcon={<AddShoppingCartIcon />}
              disabled={semStock}
              onClick={handleAdicionar}
            >
              Adicionar ao Carrinho
            </Button>
            <Button
              variant="contained"
              size="large"
              startIcon={<ShoppingCartCheckoutIcon />}
              disabled={semStock}
              onClick={handleComprarAgora}
            >
              Comprar Agora
            </Button>
          </Box>

          <Divider sx={{ mb: 2 }} />
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Especificações</Typography>
          <Table size="small">
            <TableBody>
              {Object.entries(produto.especificacoes).map(([chave, valor]) => (
                <TableRow key={chave}>
                  <TableCell sx={{ fontWeight: 600, border: 0, pl: 0, width: '40%' }}>{chave}</TableCell>
                  <TableCell sx={{ border: 0 }}>{valor}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
      </Grid>

      <Snackbar open={snackbar} autoHideDuration={3000} onClose={() => setSnackbar(false)}>
        <Alert severity="success" onClose={() => setSnackbar(false)} sx={{ width: '100%' }}>
          Produto adicionado ao carrinho!
        </Alert>
      </Snackbar>
    </Container>
  );
}
