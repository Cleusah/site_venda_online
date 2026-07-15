import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import PlaceIcon from '@mui/icons-material/Place';

export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: 'primary.dark', color: 'white', mt: 8, py: 5 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Morabeza Senior</Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Produtos e equipamentos para idosos acamados e apoio a cuidadores, com o carinho da nossa morabeza.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Contactos</Typography>
            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
              <PhoneIcon fontSize="small" /> +238 260 00 00
            </Typography>
            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
              <EmailIcon fontSize="small" /> apoio@morabezasenior.cv
            </Typography>
            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <PlaceIcon fontSize="small" /> Praia, Santiago, Cabo Verde
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Links Úteis</Typography>
            <Link href="/loja" color="inherit" underline="hover" display="block" sx={{ mb: 0.5 }}>Loja</Link>
            <Link href="/conta" color="inherit" underline="hover" display="block" sx={{ mb: 0.5 }}>A Minha Conta</Link>
            <Link href="/login" color="inherit" underline="hover" display="block">Entrar</Link>
          </Grid>
        </Grid>
        <Typography variant="body2" align="center" sx={{ opacity: 0.7, mt: 4 }}>
          © {new Date().getFullYear()} Morabeza Senior. Todos os direitos reservados.
        </Typography>
      </Container>
    </Box>
  );
}
