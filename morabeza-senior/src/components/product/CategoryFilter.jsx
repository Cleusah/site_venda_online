import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Slider from '@mui/material/Slider';
import { formatPrice } from '../../data/products.js';

export default function CategoryFilter({ categorias, categoriaAtiva, onSelectCategoria, precoMax, precoSelecionado, onChangePreco }) {
  return (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Categorias</Typography>
      <List dense disablePadding>
        <ListItemButton
          selected={categoriaAtiva === null}
          onClick={() => onSelectCategoria(null)}
          sx={{ borderRadius: 2, mb: 0.5 }}
        >
          <ListItemText primary="Todas as categorias" />
        </ListItemButton>
        {categorias.map((cat) => (
          <ListItemButton
            key={cat.id}
            selected={categoriaAtiva === cat.id}
            onClick={() => onSelectCategoria(cat.id)}
            sx={{ borderRadius: 2, mb: 0.5 }}
          >
            <ListItemText primary={cat.nome} />
          </ListItemButton>
        ))}
      </List>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Preço máximo</Typography>
      <Box sx={{ px: 1 }}>
        <Slider
          value={precoSelecionado}
          onChange={(_, val) => onChangePreco(val)}
          min={0}
          max={precoMax}
          step={1000}
          valueLabelDisplay="off"
          aria-label="Filtro de preço máximo"
        />
        <Typography variant="body2" color="text.secondary">
          Até {formatPrice(precoSelecionado)}
        </Typography>
      </Box>
    </Box>
  );
}
