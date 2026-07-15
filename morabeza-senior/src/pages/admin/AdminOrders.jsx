import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Chip from '@mui/material/Chip';

import { orders as encomendasIniciais } from '../../data/orders.js';
import { formatPrice } from '../../data/products.js';

const estados = ['Todos', 'Processando', 'Enviado', 'Entregue', 'Cancelado'];
const estadoCor = { Entregue: 'success', Enviado: 'info', Processando: 'warning', Cancelado: 'error' };

export default function AdminOrders() {
  const [encomendas, setEncomendas] = useState(encomendasIniciais);
  const [filtro, setFiltro] = useState('Todos');

  const filtradas = filtro === 'Todos' ? encomendas : encomendas.filter((o) => o.estado === filtro);

  const alterarEstado = (id, novoEstado) => {
    setEncomendas((prev) => prev.map((o) => (o.id === id ? { ...o, estado: novoEstado } : o)));
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>Encomendas</Typography>

      <Tabs
        value={filtro}
        onChange={(_, v) => setFiltro(v)}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ mb: 2 }}
      >
        {estados.map((e) => <Tab key={e} value={e} label={e} />)}
      </Tabs>

      <Paper variant="outlined">
        <Box sx={{ overflowX: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Encomenda</TableCell>
                <TableCell>Cliente</TableCell>
                <TableCell>Data</TableCell>
                <TableCell>Itens</TableCell>
                <TableCell>Pagamento</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Estado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtradas.map((o) => (
                <TableRow key={o.id}>
                  <TableCell sx={{ fontWeight: 600 }}>{o.id}</TableCell>
                  <TableCell>{o.cliente}</TableCell>
                  <TableCell>{o.data}</TableCell>
                  <TableCell>{o.itens}</TableCell>
                  <TableCell>{o.pagamento}</TableCell>
                  <TableCell>{formatPrice(o.total)}</TableCell>
                  <TableCell>
                    <Select
                      size="small"
                      value={o.estado}
                      onChange={(e) => alterarEstado(o.id, e.target.value)}
                      renderValue={(val) => <Chip size="small" label={val} color={estadoCor[val]} />}
                      sx={{ minWidth: 140 }}
                    >
                      {estados.slice(1).map((e) => <MenuItem key={e} value={e}>{e}</MenuItem>)}
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Paper>
    </Box>
  );
}
