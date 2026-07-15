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
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';

import { products as produtosIniciais, formatPrice } from '../../data/products.js';
import { categories } from '../../data/categories.js';

const vazio = { id: '', nome: '', categoria: categories[0].id, preco: '', stock: '', curta: '' };

export default function AdminProducts() {
  const [produtos, setProdutos] = useState(produtosIniciais);
  const [busca, setBusca] = useState('');
  const [dialogAberto, setDialogAberto] = useState(false);
  const [emEdicao, setEmEdicao] = useState(null);
  const [form, setForm] = useState(vazio);
  const [toast, setToast] = useState('');

  const filtrados = produtos.filter((p) => p.nome.toLowerCase().includes(busca.toLowerCase()));

  const abrirNovo = () => {
    setEmEdicao(null);
    setForm(vazio);
    setDialogAberto(true);
  };

  const abrirEdicao = (produto) => {
    setEmEdicao(produto.id);
    setForm({ ...produto, precoInput: (produto.preco / 100).toFixed(0) });
    setDialogAberto(true);
  };

  const guardar = () => {
    if (!form.nome || !form.preco) return;
    if (emEdicao) {
      setProdutos((prev) => prev.map((p) => (p.id === emEdicao ? { ...p, ...form, preco: Math.round(Number(form.precoInput ?? form.preco) * 100) } : p)));
      setToast('Produto atualizado com sucesso.');
    } else {
      const novoId = `p${Date.now()}`;
      setProdutos((prev) => [
        ...prev,
        {
          id: novoId,
          nome: form.nome,
          categoria: form.categoria,
          preco: Math.round(Number(form.precoInput || 0) * 100),
          stock: Number(form.stock) || 0,
          avaliacao: 0,
          imagem: `https://picsum.photos/seed/${novoId}/640/480`,
          curta: form.curta || '',
          descricao: form.curta || '',
          especificacoes: {}
        }
      ]);
      setToast('Produto adicionado com sucesso.');
    }
    setDialogAberto(false);
  };

  const remover = (id) => {
    setProdutos((prev) => prev.filter((p) => p.id !== id));
    setToast('Produto removido.');
  };

  const atualizarStock = (id, novoStock) => {
    setProdutos((prev) => prev.map((p) => (p.id === id ? { ...p, stock: Math.max(0, Number(novoStock) || 0) } : p)));
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>Produtos e Stock</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={abrirNovo}>Novo Produto</Button>
      </Box>

      <TextField
        placeholder="Pesquisar produtos..."
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
                <TableCell>Produto</TableCell>
                <TableCell>Categoria</TableCell>
                <TableCell>Preço</TableCell>
                <TableCell>Stock</TableCell>
                <TableCell align="right">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtrados.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Avatar variant="rounded" src={p.imagem} />
                      <Typography variant="body2" sx={{ fontWeight: 600, maxWidth: 220 }}>{p.nome}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{categories.find((c) => c.id === p.categoria)?.nome}</TableCell>
                  <TableCell>{formatPrice(p.preco)}</TableCell>
                  <TableCell>
                    <TextField
                      type="number"
                      size="small"
                      value={p.stock}
                      onChange={(e) => atualizarStock(p.id, e.target.value)}
                      sx={{ width: 80 }}
                      inputProps={{ min: 0, 'aria-label': `Stock de ${p.nome}` }}
                    />
                    {p.stock === 0 && <Chip label="Esgotado" color="error" size="small" sx={{ ml: 1 }} />}
                    {p.stock > 0 && p.stock <= 5 && <Chip label="Baixo" color="warning" size="small" sx={{ ml: 1 }} />}
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Editar">
                      <IconButton onClick={() => abrirEdicao(p)}><EditIcon /></IconButton>
                    </Tooltip>
                    <Tooltip title="Remover">
                      <IconButton color="error" onClick={() => remover(p.id)}><DeleteOutlineIcon /></IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Paper>

      <Dialog open={dialogAberto} onClose={() => setDialogAberto(false)} fullWidth maxWidth="sm">
        <DialogTitle>{emEdicao ? 'Editar Produto' : 'Novo Produto'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 0.5 }}>
            <Grid item xs={12}>
              <TextField label="Nome do produto" fullWidth value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField select label="Categoria" fullWidth value={form.categoria} onChange={(e) => setForm({ ...form, categoria: e.target.value })}>
                {categories.map((c) => <MenuItem key={c.id} value={c.id}>{c.nome}</MenuItem>)}
              </TextField>
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField label="Preço (CVE)" type="number" fullWidth value={form.precoInput ?? ''} onChange={(e) => setForm({ ...form, precoInput: e.target.value })} />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField label="Stock" type="number" fullWidth value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Descrição curta" fullWidth multiline rows={2} value={form.curta} onChange={(e) => setForm({ ...form, curta: e.target.value })} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setDialogAberto(false)}>Cancelar</Button>
          <Button variant="contained" onClick={guardar}>Guardar</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={Boolean(toast)} autoHideDuration={2500} onClose={() => setToast('')}>
        <Alert severity="success" onClose={() => setToast('')}>{toast}</Alert>
      </Snackbar>
    </Box>
  );
}
