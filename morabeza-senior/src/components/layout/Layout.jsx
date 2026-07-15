import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

export default function Layout() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}
