import React, { useState } from 'react'
import { Button, TextField, Container, Grid, Box, Avatar } from '@mui/material'
import { AccountCircle } from '@mui/icons-material'
import Navbar from '../components/navbar/Navbar'

const RegistrationForm = () => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()

    const userRequest = {
      name: name,
      email: email,
      password: password,
    }

    const response = await fetch('userapi/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userRequest),
    })

    if (response.ok) {
      console.log('User registered successfully')
    } else {
      console.log('Failed to register user')
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
                <Grid item>
                  <TextField
                    name="name"
                    label="Nazwa użytkownika"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    name="email"
                    label="Email"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item>
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
                    Zarejestruj się
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

export default RegistrationForm
