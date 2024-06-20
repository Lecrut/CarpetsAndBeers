import { Box, Button, Card, CardContent, Grid, Typography } from '@mui/material'
import DoneOutlineOutlinedIcon from '@mui/icons-material/DoneOutlineOutlined'
import { Link } from 'react-router-dom'
import Navbar from '../components/navbar/Navbar'
import { useOrderStore } from '../stores/OrderStore'

export function SuccessfulOrderPage() {
  const orderStore = useOrderStore()

  return (
    <>
      <Navbar />

      <Grid container marginTop={5} paddingX={2} justifyContent="center">
        <Grid item xs={12} md={12} lg={8} position="relative">
          <Card>
            <CardContent>
              <Box
                className="flex justify-around"
                display="flex"
                flexDirection="column"
                alignItems="center"
              >
                <Box className="flex justify-around">
                  <Typography gutterBottom variant="h3" component="div">
                    Zamówienie złożone pomyślnie
                  </Typography>
                  <DoneOutlineOutlinedIcon
                    className="ml-4 mt-2"
                    fontSize="large"
                  />
                </Box>
                <Typography gutterBottom component="div">
                  <strong>Email:</strong> {orderStore.email && orderStore.email}
                </Typography>
                <Typography gutterBottom component="div">
                  <strong>Id transakcji:</strong>
                  {orderStore.transactionsId && orderStore.transactionsId}
                </Typography>
                {orderStore.price !== 0 && (
                  <Typography gutterBottom component="div">
                    <strong>Kwota:</strong>
                    {orderStore.price} zł
                  </Typography>
                )}
                <Link to="/">
                  <Button
                    variant="contained"
                    color="secondary"
                    className="rounded-r-md"
                    size="large"
                    sx={{
                      color: 'white',
                      marginTop: '20px',
                    }}
                    onClick={() => orderStore.init()}
                  >
                    Powrót
                  </Button>
                </Link>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}
