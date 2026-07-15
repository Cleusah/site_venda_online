import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line
} from 'recharts';

import { salesByMonth, topProdutos, orders } from '../../data/orders.js';
import { formatPrice } from '../../data/products.js';
import { tokenColors } from '../../theme.js';

export default function AdminReports() {
  const totalVendido = salesByMonth.reduce((sum, m) => sum + m.vendas, 0);
  const mediaMensal = totalVendido / salesByMonth.length;
  const encomendasCanceladas = orders.filter((o) => o.estado === 'Cancelado').length;
  const taxaConversao = (((orders.length - encomendasCanceladas) / orders.length) * 100).toFixed(0);

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>Relatórios de Vendas</Typography>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={4}>
          <Paper variant="outlined" sx={{ p: 3 }}>
            <Typography variant="body2" color="text.secondary">Vendas (últimos 6 meses)</Typography>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>{formatPrice(totalVendido)}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper variant="outlined" sx={{ p: 3 }}>
            <Typography variant="body2" color="text.secondary">Média Mensal</Typography>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>{formatPrice(mediaMensal)}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper variant="outlined" sx={{ p: 3 }}>
            <Typography variant="body2" color="text.secondary">Taxa de Encomendas Concluídas</Typography>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>{taxaConversao}%</Typography>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <Paper variant="outlined" sx={{ p: 3, height: 380 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Vendas por Mês</Typography>
            <ResponsiveContainer width="100%" height="85%">
              <BarChart data={salesByMonth}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="mes" />
                <YAxis tickFormatter={(v) => `${v / 1000}k`} />
                <Tooltip formatter={(value) => formatPrice(value)} />
                <Bar dataKey="vendas" fill={tokenColors.atlantic} radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={5}>
          <Paper variant="outlined" sx={{ p: 3, height: 380, overflow: 'auto' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Produtos Mais Vendidos</Typography>
            <List>
              {topProdutos.map((p, i) => (
                <Box key={p.nome}>
                  <ListItem disableGutters>
                    <ListItemText primary={`${i + 1}. ${p.nome}`} secondary={`${p.vendidos} unidades vendidas`} />
                  </ListItem>
                  {i < topProdutos.length - 1 && <Divider />}
                </Box>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper variant="outlined" sx={{ p: 3, height: 320 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Tendência de Vendas</Typography>
            <ResponsiveContainer width="100%" height="80%">
              <LineChart data={salesByMonth}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="mes" />
                <YAxis tickFormatter={(v) => `${v / 1000}k`} />
                <Tooltip formatter={(value) => formatPrice(value)} />
                <Line type="monotone" dataKey="vendas" stroke={tokenColors.sun} strokeWidth={3} dot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
