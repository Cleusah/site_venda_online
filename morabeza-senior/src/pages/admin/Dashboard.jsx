import { Link as RouterLink } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Chip from '@mui/material/Chip';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';

import PaidIcon from '@mui/icons-material/Paid';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

import { products, formatPrice } from '../../data/products.js';
import { orders } from '../../data/orders.js';
import { customers } from '../../data/customers.js';

const estadoCor = { Entregue: 'success', Enviado: 'info', Processando: 'warning', Cancelado: 'error' };

export default function Dashboard() {
  const totalVendas = orders.filter((o) => o.estado !== 'Cancelado').reduce((sum, o) => sum + o.total, 0);
  const stockBaixo = products.filter((p) => p.stock <= 5);

  const cards = [
    { titulo: 'Vendas Totais', valor: formatPrice(totalVendas), icon: <PaidIcon fontSize="large" />, cor: 'primary.main' },
    { titulo: 'Encomendas', valor: orders.length, icon: <ReceiptLongIcon fontSize="large" />, cor: 'secondary.main' },
    { titulo: 'Produtos', valor: products.length, icon: <Inventory2Icon fontSize="large" />, cor: 'success.main' },
    { titulo: 'Clientes', valor: customers.length, icon: <PeopleAltIcon fontSize="large" />, cor: 'info.main' }
  ];

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>Painel de Administração</Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {cards.map((card) => (
          <Grid item xs={12} sm={6} lg={3} key={card.titulo}>
            <Paper variant="outlined" sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ color: card.cor }}>{card.icon}</Box>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>{card.valor}</Typography>
                <Typography variant="body2" color="text.secondary">{card.titulo}</Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {stockBaixo.length > 0 && (
        <Alert
          severity="warning"
          icon={<WarningAmberIcon />}
          sx={{ mb: 3 }}
          action={
            <Button color="inherit" size="small" component={RouterLink} to="/admin/produtos">
              Ver Stock
            </Button>
          }
        >
          {stockBaixo.length} produto(s) com stock baixo: {stockBaixo.map((p) => p.nome).join(', ')}
        </Alert>
      )}

      <Paper variant="outlined" sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>Encomendas Recentes</Typography>
          <Button component={RouterLink} to="/admin/encomendas" size="small">Ver todas</Button>
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Cliente</TableCell>
              <TableCell>Data</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Estado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.slice(0, 5).map((o) => (
              <TableRow key={o.id}>
                <TableCell>{o.id}</TableCell>
                <TableCell>{o.cliente}</TableCell>
                <TableCell>{o.data}</TableCell>
                <TableCell>{formatPrice(o.total)}</TableCell>
                <TableCell><Chip size="small" label={o.estado} color={estadoCor[o.estado]} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}
