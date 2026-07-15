import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';

import { products } from '../data/products.js';
import { categories } from '../data/categories.js';
import ProductCard from '../components/product/ProductCard.jsx';
import CategoryFilter from '../components/product/CategoryFilter.jsx';

const PRECO_MAX = Math.max(...products.map((p) => p.preco));

export default function Shop() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [searchParams, setSearchParams] = useSearchParams();
  const categoriaAtiva = searchParams.get('categoria');
  const [busca, setBusca] = useState('');
  const [precoSelecionado, setPrecoSelecionado] = useState(PRECO_MAX);
  const [filtrosAbertos, setFiltrosAbertos] = useState(false);

  const setCategoria = (id) => {
    if (id) setSearchParams({ categoria: id });
    else setSearchParams({});
  };

  const produtosFiltrados = useMemo(() => {
    return products.filter((p) => {
      const matchCategoria = !categoriaAtiva || p.categoria === categoriaAtiva;
      const matchPreco = p.preco <= precoSelecionado;
      const matchBusca = p.nome.toLowerCase().includes(busca.toLowerCase());
      return matchCategoria && matchPreco && matchBusca;
    });
  }, [categoriaAtiva, precoSelecionado, busca]);

  const filtros = (
    <CategoryFilter
      categorias={categories}
      categoriaAtiva={categoriaAtiva}
      onSelectCategoria={(id) => { setCategoria(id); setFiltrosAbertos(false); }}
      precoMax={PRECO_MAX}
      precoSelecionado={precoSelecionado}
      onChangePreco={setPrecoSelecionado}
    />
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>Loja</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        {produtosFiltrados.length} produto(s) encontrado(s)
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        <TextField
          placeholder="Pesquisar produtos..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          sx={{ flexGrow: 1, minWidth: 220 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
          inputProps={{ 'aria-label': 'Pesquisar produtos' }}
        />
        {isMobile && (
          <Button variant="outlined" startIcon={<TuneIcon />} onClick={() => setFiltrosAbertos(true)}>
            Filtros
          </Button>
        )}
      </Box>

      <Grid container spacing={4}>
        {!isMobile && (
          <Grid item md={3}>
            {filtros}
          </Grid>
        )}

        <Grid item xs={12} md={9}>
          {produtosFiltrados.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6">Não encontrámos produtos com esses filtros.</Typography>
              <Typography variant="body2" color="text.secondary">Tente ajustar a categoria, o preço ou a pesquisa.</Typography>
            </Box>
          ) : (
            <Grid container spacing={3}>
              {produtosFiltrados.map((produto) => (
                <Grid item xs={12} sm={6} lg={4} key={produto.id}>
                  <ProductCard produto={produto} />
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>
      </Grid>

      <Drawer anchor="bottom" open={filtrosAbertos} onClose={() => setFiltrosAbertos(false)}>
        <Box sx={{ p: 3 }}>{filtros}</Box>
      </Drawer>
    </Container>
  );
}
