import type { SetStateAction } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import React, { useState } from 'react'
import {
  Alert,
  AlertTitle,
  Avatar,
  Box,
  Button,
  Container,
  Dialog,
  Grid,
  TextField,
} from '@mui/material'
// import { AccountCircle } from '@mui/icons-material'
import Navbar from '../components/navbar/Navbar'
// import { useNavigate } from 'react-router-dom'

function RegistrationForm() {
  const [name, setName] = useState('')
  const [nameError, setNameError] = useState('')

  const navigate = useNavigate()

  const handleNameChange = (e: {
    target: { value: SetStateAction<string> }
  }) => {
    setName(e.target.value)
    if (!name || name.length < 2) setNameError('Za krótka nazwa użytkownika')
    else setNameError('')
  }

  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')

  const handleEmailChange = (e: {
    target: { value: SetStateAction<string> }
  }) => {
    setEmail(e.target.value)
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      setEmailError('Zły format adresu email')
    else setEmailError('')
  }

  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const handlePasswordChange = (e: {
    target: { value: SetStateAction<string> }
  }) => {
    setPassword(e.target.value)
    if (!password || password.length < 7) setPasswordError('Za krótkie hasło')
    else setPasswordError('')
  }

  const [openDialog, setOpenDialog] = useState(false)
  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    const userRequest = {
      name,
      email,
      password,
    }

    if (
      emailError ||
      passwordError ||
      nameError ||
      !name ||
      !password ||
      !email
    ) {
      setOpenDialog(true)
      setTimeout(() => {
        setOpenDialog(false)
      }, 2000)
      return
    }

    const response = await fetch('/api/userapi/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userRequest),
    })

    if (response.ok) {
      console.log('User registered successfully')
      navigate('/')
      alert('Zarejestrowano pomyślnie')
    } else {
      console.log('Failed to register user')
      setOpenDialog(true)
      setTimeout(() => {
        setOpenDialog(false)
      }, 2000)
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
            <form onSubmit={handleSubmit} noValidate>
              <Grid container spacing={2} direction="column">
                <Grid item>
                  <TextField
                    name="name"
                    label="Nazwa użytkownika"
                    variant="outlined"
                    value={name}
                    onChange={handleNameChange}
                    required
                    helperText={nameError}
                    error={nameError}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    name="email"
                    label="Email"
                    variant="outlined"
                    value={email}
                    inputProps={{
                      type: 'email',
                    }}
                    onChange={handleEmailChange}
                    helperText={emailError}
                    error={emailError}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    name="password"
                    label="Hasło"
                    type="password"
                    variant="outlined"
                    value={password}
                    required
                    onChange={handlePasswordChange}
                    helperText={passwordError}
                    error={passwordError}
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

      <Dialog open={openDialog}>
        <Alert severity="error">
          <AlertTitle>Ops!</AlertTitle>
          Niestety nie udało Ci się zarejestrować
        </Alert>
      </Dialog>
    </>
  )
}

export default RegistrationForm
