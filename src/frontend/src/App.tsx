import { ThemeProvider, Typography, createTheme } from '@mui/material'
import './App.css'
import LandingPage from './pages/LandingPage'

const theme = createTheme({
  palette: {
    primary: {
      main: '#004225',
    },
    secondary: {
      main: '#FFB000',
    },
  },
  components: {
    MuiIconButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            color: '#FFB000',
          },
        },
      },
    },
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LandingPage />
      <Typography variant="body1" align="center" color="textSecondary">
        © 2024 Beers & Carpets
      </Typography>
    </ThemeProvider>
  )
}

export default App
