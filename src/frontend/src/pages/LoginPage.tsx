import React, { useState } from 'react'
import { Button, TextField, Container, Grid, Box, Avatar } from '@mui/material'
// import { AccountCircle } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import Navbar from '../components/navbar/Navbar'
import { useUserStore } from '../stores/UserStore'
import { useNavigate } from 'react-router-dom'


const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const setUser = useUserStore((state) => state.setUser) 
  const navigate = useNavigate()

    const handleSubmit = async (event) => {
    event.preventDefault()

    const userLogin = {
      email: email,
      password: password,
    }

    const response = await fetch('/api/userapi/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userLogin),
    })

    if (response.ok) {
      const userData = await response.json() 
      setUser(userData) 
      console.log('User logged in successfully')
      navigate('/')
    } else {
      console.log('Failed to log in')
    }
  }

  return (
    <>
      <Navbar />
      <Container>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: '100vh' }}
        >
          <Avatar src="../public/1.jpg" />
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            style={{ width: '100%', marginTop: '20px' }}
          >
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2} direction="column">
                <Grid item xs={12} display="flex" justifyContent="center">
                  <TextField
                    name="email"
                    label="Email"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} display="flex" justifyContent="center">
                  <TextField
                    name="password"
                    label="Hasło"
                    type="password"
                    variant="outlined"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} display="flex" justifyContent="center">
                  <Button type="submit" variant="contained" color="primary">
                    Zaloguj się
                  </Button>
                </Grid>
                <Grid item xs={12} display="flex" justifyContent="center">
                  <Button variant="text" component={Link} to="/register">
                    Nie masz konta? Zarejestruj się
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default LoginForm
