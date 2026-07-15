import { createTheme } from '@mui/material/styles';

// Morabeza Senior — paleta inspirada no Atlântico e no sol de Cabo Verde,
// pensada para bom contraste e legibilidade para utilizadores idosos.
const tokens = {
  atlantic: '#1B5E63',    // teal profundo — confiança, mar
  atlanticDark: '#123F43',
  atlanticLight: '#4FA3A0',
  sun: '#E08D3C',         // terracota/laranja do sol — calor humano, "morabeza"
  sunDark: '#C06F22',
  sand: '#FBF6EC',        // fundo quente, não-branco puro
  ink: '#2B2118',         // texto quase-preto quente
  leaf: '#4C8B5B',        // sucesso
  brick: '#B3452C'        // erro, tom terroso em vez de vermelho puro
};

export const getTheme = (fontScale = 1) => createTheme({
  palette: {
    mode: 'light',
    primary: { main: tokens.atlantic, dark: tokens.atlanticDark, light: tokens.atlanticLight, contrastText: '#fff' },
    secondary: { main: tokens.sun, dark: tokens.sunDark, contrastText: '#fff' },
    success: { main: tokens.leaf },
    error: { main: tokens.brick },
    background: { default: tokens.sand, paper: '#ffffff' },
    text: { primary: tokens.ink, secondary: '#5A4E42' }
  },
  shape: { borderRadius: 14 },
  typography: {
    fontFamily: '"Inter", "Segoe UI", sans-serif',
    htmlFontSize: 16 * fontScale,
    h1: { fontFamily: '"Baloo 2", sans-serif', fontWeight: 700 },
    h2: { fontFamily: '"Baloo 2", sans-serif', fontWeight: 700 },
    h3: { fontFamily: '"Baloo 2", sans-serif', fontWeight: 600 },
    h4: { fontFamily: '"Baloo 2", sans-serif', fontWeight: 600 },
    h5: { fontFamily: '"Baloo 2", sans-serif', fontWeight: 600 },
    h6: { fontFamily: '"Baloo 2", sans-serif', fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 600, fontSize: '1rem' },
    body1: { fontSize: '1.05rem', lineHeight: 1.7 },
    body2: { fontSize: '0.95rem', lineHeight: 1.6 }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '*:focus-visible': {
          outline: `3px solid ${tokens.sun}`,
          outlineOffset: '2px'
        },
        body: { scrollBehavior: 'smooth' }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: { minHeight: 48, borderRadius: 10, paddingLeft: 20, paddingRight: 20 },
        sizeLarge: { minHeight: 56, fontSize: '1.1rem' }
      }
    },
    MuiIconButton: {
      styleOverrides: { root: { minWidth: 44, minHeight: 44 } }
    },
    MuiCard: {
      styleOverrides: {
        root: { boxShadow: '0 2px 12px rgba(27,94,99,0.08)', borderRadius: 16 }
      }
    },
    MuiChip: {
      styleOverrides: { root: { fontWeight: 600 } }
    }
  }
});

export const tokenColors = tokens;
