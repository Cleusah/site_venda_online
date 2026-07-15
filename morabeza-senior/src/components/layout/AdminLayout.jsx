import { useState } from 'react';
import { Outlet, Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import BarChartIcon from '@mui/icons-material/BarChart';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LogoutIcon from '@mui/icons-material/Logout';

import { useAuth } from '../../context/AuthContext.jsx';

const drawerWidth = 250;

const links = [
  { label: 'Painel', to: '/admin', icon: <DashboardIcon />, end: true },
  { label: 'Produtos e Stock', to: '/admin/produtos', icon: <Inventory2Icon /> },
  { label: 'Encomendas', to: '/admin/encomendas', icon: <ReceiptLongIcon /> },
  { label: 'Clientes', to: '/admin/clientes', icon: <PeopleAltIcon /> },
  { label: 'Relatórios de Vendas', to: '/admin/relatorios', icon: <BarChartIcon /> }
];

export default function AdminLayout() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const isActive = (link) => (link.end ? location.pathname === link.to : location.pathname.startsWith(link.to));

  const drawerContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Toolbar sx={{ fontWeight: 700 }}>Morabeza • Backoffice</Toolbar>
      <Divider />
      <List sx={{ flexGrow: 1 }}>
        {links.map((link) => (
          <ListItemButton
            key={link.to}
            component={RouterLink}
            to={link.to}
            selected={isActive(link)}
            onClick={() => setMobileOpen(false)}
          >
            <ListItemIcon>{link.icon}</ListItemIcon>
            <ListItemText primary={link.label} />
          </ListItemButton>
        ))}
      </List>
      <Divider />
      <List>
        <ListItemButton component={RouterLink} to="/">
          <ListItemIcon><ArrowBackIcon /></ListItemIcon>
          <ListItemText primary="Voltar à Loja" />
        </ListItemButton>
        <ListItemButton onClick={() => { logout(); navigate('/'); }}>
          <ListItemIcon><LogoutIcon /></ListItemIcon>
          <ListItemText primary="Terminar Sessão" />
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar
        position="fixed"
        color="primary"
        sx={{ zIndex: theme.zIndex.drawer + 1, display: { md: 'none' } }}
      >
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={() => setMobileOpen(true)} aria-label="Abrir menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ ml: 2, fontWeight: 700 }}>Backoffice</Typography>
        </Toolbar>
      </AppBar>

      <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
        <Drawer
          variant={isMobile ? 'temporary' : 'permanent'}
          open={isMobile ? mobileOpen : true}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
          }}
        >
          {drawerContent}
        </Drawer>
      </Box>

      <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, md: 4 }, mt: { xs: 7, md: 0 }, bgcolor: 'background.default', minHeight: '100vh' }}>
        <Outlet />
      </Box>
    </Box>
  );
}
