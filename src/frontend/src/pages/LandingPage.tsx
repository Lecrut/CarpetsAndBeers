import { Grid } from '@mui/material'
import Carousel from '../components/Carousel'
import Footer from '../components/Footer'
import Navbar from '../components/navbar/Navbar'

function LandingPage() {
  return (
    <>
      <Navbar />

      <Grid container marginTop={2} paddingX={2} justifyContent="center">
        <Grid item xs={12} md={12} lg={6} position={'relative'}>
          <Carousel />
        </Grid>
      </Grid>

      <h1>Polecane produkty</h1>
      <Footer />
    </>
  )
}

export default LandingPage
