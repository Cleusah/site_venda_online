import { useMemo } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { getTheme } from './theme';
import { CartProvider } from './context/CartContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { AccessibilityProvider, useAccessibility } from './context/AccessibilityContext.jsx';

import Layout from './components/layout/Layout.jsx';
import AdminLayout from './components/layout/AdminLayout.jsx';
import ProtectedRoute from './components/common/ProtectedRoute.jsx';

import Home from './pages/Home.jsx';
import Shop from './pages/Shop.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Account from './pages/Account.jsx';
import NotFound from './pages/NotFound.jsx';

import Dashboard from './pages/admin/Dashboard.jsx';
import AdminProducts from './pages/admin/AdminProducts.jsx';
import AdminOrders from './pages/admin/AdminOrders.jsx';
import AdminCustomers from './pages/admin/AdminCustomers.jsx';
import AdminReports from './pages/admin/AdminReports.jsx';

function ThemedApp() {
  const { fontScale } = useAccessibility();
  const theme = useMemo(() => getTheme(fontScale), [fontScale]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/loja" element={<Shop />} />
          <Route path="/produto/:id" element={<ProductDetail />} />
          <Route path="/carrinho" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registo" element={<Register />} />
          <Route
            path="/conta"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="produtos" element={<AdminProducts />} />
          <Route path="encomendas" element={<AdminOrders />} />
          <Route path="clientes" element={<AdminCustomers />} />
          <Route path="relatorios" element={<AdminReports />} />
        </Route>

        <Route path="*" element={<Layout />}>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <AccessibilityProvider>
      <AuthProvider>
        <CartProvider>
          <ThemedApp />
        </CartProvider>
      </AuthProvider>
    </AccessibilityProvider>
  );
}
