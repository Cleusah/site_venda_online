import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import StorefrontIcon from '@mui/icons-material/Storefront';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';
import TextIncreaseIcon from '@mui/icons-material/TextIncrease';
import TextDecreaseIcon from '@mui/icons-material/TextDecrease';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { useCart } from '../../context/CartContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { useAccessibility } from '../../context/AccessibilityContext.jsx';
import { tokenColors } from '../../theme';

export default function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { totalItens } = useCart();
  const { user, isAdmin, logout } = useAuth();
  const { increase, decrease } = useAccessibility();
  const navigate = useNavigate();

  const closeMenu = () => setAnchorEl(null);
  const handleLogout = () => {
    logout();
    closeMenu();
    navigate('/');
  };

  const navLinks = [
    { label: 'Início', to: '/', icon: <HomeIcon /> },
    { label: 'Loja', to: '/loja', icon: <StorefrontIcon /> }
  ];

  return (
    <>
      <AppBar position="sticky" color="primary" elevation={2}>
        <Toolbar sx={{ gap: 1, minHeight: 72 }}>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="Abrir menu de navegação"
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Box
            component={RouterLink}
            to="/"
            sx={{ display: 'flex', alignItems: 'center', gap: 1, textDecoration: 'none', color: 'inherit', flexGrow: isMobile ? 1 : 0 }}
          >
            <FavoriteIcon sx={{ color: tokenColors.sun }} />
            <Typography variant="h6" component="span" sx={{ fontWeight: 700, whiteSpace: 'nowrap' }}>
              Morabeza Senior
            </Typography>
          </Box>

          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 1, ml: 3, flexGrow: 1 }}>
              {navLinks.map((link) => (
                <Button key={link.to} component={RouterLink} to={link.to} color="inherit" sx={{ fontSize: '1rem' }}>
                  {link.label}
                </Button>
              ))}
              {isAdmin && (
                <Button component={RouterLink} to="/admin" color="inherit" startIcon={<AdminPanelSettingsIcon />}>
                  Backoffice
                </Button>
              )}
            </Box>
          )}

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, ml: 'auto' }}>
            <Tooltip title="Diminuir tamanho do texto">
              <IconButton color="inherit" onClick={decrease} aria-label="Diminuir tamanho do texto">
                <TextDecreaseIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Aumentar tamanho do texto">
              <IconButton color="inherit" onClick={increase} aria-label="Aumentar tamanho do texto">
                <TextIncreaseIcon />
              </IconButton>
            </Tooltip>

            <IconButton
              color="inherit"
              component={RouterLink}
              to="/carrinho"
              aria-label={`Carrinho de compras, ${totalItens} itens`}
            >
              <Badge badgeContent={totalItens} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            <IconButton
              color="inherit"
              aria-label="Conta do utilizador"
              onClick={(e) => setAnchorEl(e.currentTarget)}
            >
              <AccountCircleIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeMenu}>
              {user ? (
                [
                  <MenuItem key="ola" disabled sx={{ opacity: '1 !important', fontWeight: 600 }}>
                    Olá, {user.nome.split(' ')[0]}
                  </MenuItem>,
                  <Divider key="d1" />,
                  <MenuItem key="conta" component={RouterLink} to="/conta" onClick={closeMenu}>
                    A Minha Conta
                  </MenuItem>,
                  isAdmin && (
                    <MenuItem key="admin" component={RouterLink} to="/admin" onClick={closeMenu}>
                      <ListItemIcon><AdminPanelSettingsIcon fontSize="small" /></ListItemIcon>
                      Backoffice
                    </MenuItem>
                  ),
                  <MenuItem key="logout" onClick={handleLogout}>
                    <ListItemIcon><LogoutIcon fontSize="small" /></ListItemIcon>
                    Terminar Sessão
                  </MenuItem>
                ]
              ) : (
                [
                  <MenuItem key="login" component={RouterLink} to="/login" onClick={closeMenu}>
                    Entrar
                  </MenuItem>,
                  <MenuItem key="registo" component={RouterLink} to="/registo" onClick={closeMenu}>
                    Criar Conta
                  </MenuItem>
                ]
              )}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 260 }} role="presentation" onClick={() => setDrawerOpen(false)}>
          <Typography variant="h6" sx={{ p: 2, fontWeight: 700 }}>Morabeza Senior</Typography>
          <Divider />
          <List>
            {navLinks.map((link) => (
              <ListItemButton key={link.to} component={RouterLink} to={link.to}>
                <ListItemIcon>{link.icon}</ListItemIcon>
                <ListItemText primary={link.label} />
              </ListItemButton>
            ))}
            {isAdmin && (
              <ListItemButton component={RouterLink} to="/admin">
                <ListItemIcon><AdminPanelSettingsIcon /></ListItemIcon>
                <ListItemText primary="Backoffice" />
              </ListItemButton>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
