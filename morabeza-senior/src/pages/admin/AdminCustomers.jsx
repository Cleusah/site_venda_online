import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Avatar from '@mui/material/Avatar';
import SearchIcon from '@mui/icons-material/Search';

import { customers } from '../../data/customers.js';
import { formatPrice } from '../../data/products.js';

export default function AdminCustomers() {
  const [busca, setBusca] = useState('');

  const filtrados = customers.filter(
    (c) => c.nome.toLowerCase().includes(busca.toLowerCase()) || c.email.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>Clientes</Typography>

      <TextField
        placeholder="Pesquisar por nome ou email..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        sx={{ mb: 2, width: { xs: '100%', sm: 320 } }}
        InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }}
      />

      <Paper variant="outlined">
        <Box sx={{ overflowX: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Cliente</TableCell>
                <TableCell>Contacto</TableCell>
                <TableCell>Cidade</TableCell>
                <TableCell>Encomendas</TableCell>
                <TableCell>Total Gasto</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtrados.map((c) => (
                <TableRow key={c.id}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Avatar sx={{ bgcolor: 'primary.main' }}>{c.nome.charAt(0)}</Avatar>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>{c.nome}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{c.email}</Typography>
                    <Typography variant="body2" color="text.secondary">{c.telefone}</Typography>
                  </TableCell>
                  <TableCell>{c.cidade}</TableCell>
                  <TableCell>{c.encomendas}</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>{formatPrice(c.totalGasto)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Paper>
    </Box>
  );
}
