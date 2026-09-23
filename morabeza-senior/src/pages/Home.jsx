import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';

import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { categories } from '../data/categories.js';
import { products } from '../data/products.js';
import ProductCard from '../components/product/ProductCard.jsx';
import { tokenColors } from '../theme.js';

const iconeCategoria = {
  bed: '🛏️', wheelchair: '♿', shower: '🚿', diaper: '🧷',
  walker: '🦯', cushion: '🪑', food: '🥣', monitor: '🩺'
};

export default function Home() {
  const destaques = products.slice(0, 4);

  return (
    <Box>
      {/* Hero */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: { xs: 6, md: 9 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <Typography variant="h2" sx={{ fontSize: { xs: '2.1rem', md: '3rem' }, mb: 2 }}>
                Cuidado com carinho, para quem mais precisa
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '1.2rem', mb: 4, opacity: 0.95 }}>
                A Morabeza Senior reúne equipamentos e produtos de qualidade para idosos acamados
                e apoio diário a cuidadores — entrega em toda Cabo Verde.
              </Typography>
              <Button
                component={RouterLink}
                to="/loja"
                variant="contained"
                size="large"
                color="secondary"
                endIcon={<ArrowForwardIcon />}
              >
                Ver Loja
              </Button>
            </Grid>
            <Grid item xs={12} md={5} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Box
                component="img"
                src="/products/hero.svg"
                alt="Cuidador a ajudar idoso, cena de carinho e apoio"
                sx={{ width: '100%', borderRadius: 4, boxShadow: 6 }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Confiança */}
      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Grid container spacing={3}>
          {[
            { icon: <LocalShippingIcon fontSize="large" />, titulo: 'Entrega ao domicílio', texto: 'Em toda a ilha, com acompanhamento da encomenda.' },
            { icon: <VerifiedUserIcon fontSize="large" />, titulo: 'Produtos de confiança', texto: 'Selecionados para segurança e conforto.' },
            { icon: <SupportAgentIcon fontSize="large" />, titulo: 'Apoio ao cuidador', texto: 'Equipa disponível para esclarecer dúvidas.' }
          ].map((item) => (
            <Grid item xs={12} sm={4} key={item.titulo}>
              <Paper sx={{ p: 3, textAlign: 'center', height: '100%' }} elevation={0} variant="outlined">
                <Box sx={{ color: 'primary.main', mb: 1 }}>{item.icon}</Box>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>{item.titulo}</Typography>
                <Typography variant="body2" color="text.secondary">{item.texto}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Categorias */}
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>Comprar por Categoria</Typography>
        <Grid container spacing={2}>
          {categories.map((cat) => (
            <Grid item xs={6} sm={4} md={3} key={cat.id}>
              <Paper
                component={RouterLink}
                to={`/loja?categoria=${cat.id}`}
                elevation={0}
                variant="outlined"
                sx={{
                  p: 2.5, textAlign: 'center', textDecoration: 'none', display: 'block',
                  transition: 'transform 0.15s, box-shadow 0.15s',
                  '&:hover': { transform: 'translateY(-3px)', boxShadow: 3 }
                }}
              >
                <Avatar sx={{ bgcolor: tokenColors.sand, color: 'primary.main', mx: 'auto', mb: 1, width: 56, height: 56, fontSize: '1.6rem' }}>
                  {iconeCategoria[cat.icon] || '🧡'}
                </Avatar>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary' }}>
                  {cat.nome}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Destaques */}
      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 1 }}>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>Produtos em Destaque</Typography>
          <Button component={RouterLink} to="/loja" endIcon={<ArrowForwardIcon />}>Ver todos</Button>
        </Box>
        <Grid container spacing={3}>
          {destaques.map((produto) => (
            <Grid item xs={12} sm={6} md={3} key={produto.id}>
              <ProductCard produto={produto} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
