import { ThemeProvider, createTheme } from '@mui/material'
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
    </ThemeProvider>
  )
}

export default App
