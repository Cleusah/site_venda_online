import { Link as RouterLink } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import { formatPrice } from '../../data/products.js';
import { useCart } from '../../context/CartContext.jsx';

export default function ProductCard({ produto }) {
  const { addItem } = useCart();
  const semStock = produto.stock === 0;

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component={RouterLink}
        to={`/produto/${produto.id}`}
        sx={{ height: 180, backgroundSize: 'cover' }}
        image={produto.imagem}
        title={produto.nome}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          component={RouterLink}
          to={`/produto/${produto.id}`}
          variant="subtitle1"
          sx={{ fontWeight: 600, textDecoration: 'none', color: 'text.primary', display: 'block', mb: 0.5 }}
        >
          {produto.nome}
        </Typography>
        <Rating value={produto.avaliacao} precision={0.1} size="small" readOnly sx={{ mb: 1 }} />
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {produto.curta}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, flexWrap: 'wrap' }}>
          <Typography variant="h6" color="primary.main" sx={{ fontWeight: 700 }}>
            {formatPrice(produto.preco)}
          </Typography>
          {produto.precoAntigo && (
            <Typography variant="body2" sx={{ textDecoration: 'line-through', color: 'text.secondary' }}>
              {formatPrice(produto.precoAntigo)}
            </Typography>
          )}
        </Box>
        {semStock ? (
          <Chip label="Esgotado" color="error" size="small" sx={{ mt: 1 }} />
        ) : produto.stock <= 5 ? (
          <Chip label={`Últimas ${produto.stock} unidades`} color="secondary" size="small" sx={{ mt: 1 }} />
        ) : null}
      </CardContent>
      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          fullWidth
          variant="contained"
          startIcon={<AddShoppingCartIcon />}
          disabled={semStock}
          onClick={() => addItem(produto, 1)}
        >
          {semStock ? 'Esgotado' : 'Adicionar'}
        </Button>
      </CardActions>
    </Card>
  );
}
