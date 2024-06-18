import { ThemeProvider, createTheme } from '@mui/material'
import './App.css'
import LandingPage from './pages/LandingPage'
import { Route, Routes } from 'react-router-dom'
import ContactPage from './pages/ContactPage'
import ProfilePage from './pages/ProfilePage'
import RegisterPage from './pages/RegisterPage'
import FinalOrderPage from './pages/FinalOrderPage'
import LoginForm from './pages/LoginPage'
import WishListPage from './pages/WishListPage.tsx'
import ShoppingCartPage from './pages/ShoppingCartPage.tsx'
import FindProductPage from './pages/FindProductPage.tsx'
import AddProductPage from './pages/admin/AddProductPage.tsx'
import { useUserStore } from './stores/UserStore'

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
  const user = useUserStore((state) => state.user)
  console.log(user?.role)
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/contact" element={<ContactPage />}></Route>
        <Route path="/profile" element={user?.role === 'ADMIN' ? <AddProductPage /> : <ProfilePage />} />
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/login" element={<LoginForm />}></Route>
        <Route path="/wish-list" element={<WishListPage />}></Route>
        <Route path="/shopping-cart" element={<ShoppingCartPage />}></Route>
        <Route path="/final-order" element={<FinalOrderPage />}></Route>
        <Route path="/find-products" element={<FindProductPage />}></Route>
      </Routes>
    </ThemeProvider>
  )
}

export default App
