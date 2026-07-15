import { Link as RouterLink } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';

export default function NotFound() {
  return (
    <Container maxWidth="sm" sx={{ py: 12, textAlign: 'center' }}>
      <SentimentDissatisfiedIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>Página não encontrada</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        O conteúdo que procura não existe ou foi movido.
      </Typography>
      <Button component={RouterLink} to="/" variant="contained" size="large">
        Voltar ao Início
      </Button>
    </Container>
  );
}
