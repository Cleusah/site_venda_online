import { useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Chip from '@mui/material/Chip';
import Alert from '@mui/material/Alert';

import { useAuth } from '../context/AuthContext.jsx';
import { orders } from '../data/orders.js';
import { formatPrice } from '../data/products.js';

const estadoCor = { Entregue: 'success', Enviado: 'info', Processando: 'warning', Cancelado: 'error' };

export default function Account() {
  const { user } = useAuth();
  const [tab, setTab] = useState(0);
  const [nome, setNome] = useState(user?.nome || '');

  const minhasEncomendas = orders.filter((o) => o.cliente.toLowerCase() === user?.nome?.toLowerCase());

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Avatar sx={{ width: 64, height: 64, bgcolor: 'primary.main', fontSize: '1.5rem' }}>
          {user?.nome?.charAt(0).toUpperCase()}
        </Avatar>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>{user?.nome}</Typography>
          <Typography variant="body2" color="text.secondary">{user?.email}</Typography>
        </Box>
      </Box>

      <Paper variant="outlined">
        <Tabs value={tab} onChange={(_, v) => setTab(v)} variant="fullWidth">
          <Tab label="Perfil" />
          <Tab label="As Minhas Encomendas" />
        </Tabs>

        <Box sx={{ p: 3 }}>
          {tab === 0 && (
            <Box component="form">
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField label="Nome completo" fullWidth value={nome} onChange={(e) => setNome(e.target.value)} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Email" fullWidth value={user?.email || ''} disabled />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Telefone" fullWidth placeholder="+238 9XX XX XX" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Cidade" fullWidth placeholder="Praia" />
                </Grid>
                <Grid item xs={12}>
                  <TextField label="Endereço de entrega" fullWidth multiline rows={2} />
                </Grid>
              </Grid>
              <Button variant="contained" size="large" sx={{ mt: 3 }}>Guardar Alterações</Button>
            </Box>
          )}

          {tab === 1 && (
            minhasEncomendas.length === 0 ? (
              <Alert severity="info">
                Ainda não tem encomendas associadas a esta conta. Experimente iniciar sessão como "Cleu Andrade"
                para ver um histórico de exemplo, ou faça a sua primeira compra na loja.
              </Alert>
            ) : (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Encomenda</TableCell>
                    <TableCell>Data</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell>Estado</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {minhasEncomendas.map((o) => (
                    <TableRow key={o.id}>
                      <TableCell>{o.id}</TableCell>
                      <TableCell>{o.data}</TableCell>
                      <TableCell>{formatPrice(o.total)}</TableCell>
                      <TableCell><Chip size="small" label={o.estado} color={estadoCor[o.estado]} /></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )
          )}
        </Box>
      </Paper>
    </Container>
  );
}
