import { ThemeProvider, createTheme } from '@mui/material'
import './App.css'
import LandingPage from './pages/LandingPage'
import { Route, Routes } from 'react-router-dom'
import ContactPage from './pages/ContactPage'
import ProfilePage from './pages/ProfilePage'

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
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/contact" element={<ContactPage />}></Route>
        <Route path="/profile" element={<ProfilePage />}></Route>
      </Routes>
    </ThemeProvider>
  )
}

export default App
