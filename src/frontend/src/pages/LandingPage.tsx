import { Grid } from '@mui/material'
import Carousel from '../components/Carousel'
import Footer from '../components/Footer'
import Navbar from '../components/navbar/Navbar'
import ProductCard from '../components/ProductCard'

function LandingPage() {
  const recommendedItems = [
    {
      name: 'Lokalne piwo',
      price: 15,
      url: '/temp_products/corona.png',
    },
    {
      name: 'Lokalne piwo 2',
      price: 35,
      url: '/temp_products/corona.png',
    },
    {
      name: 'Dywan',
      price: 75,
      url: '/images/banner1.jpg',
    },
  ]

  return (
    <>
      <Navbar />

      <Grid container marginTop={3} paddingX={2} justifyContent="center">
        <Grid item xs={12} md={12} lg={6} position={'relative'}>
          <Carousel />
        </Grid>
      </Grid>

      <h1 className="text-center text-3xl font-bold">Polecane produkty</h1>

      <Grid
        container
        justifyContent="center"
        alignItems="center"
        className="mt-6 gap-20"
      >
        {recommendedItems.map((item, i) => {
          return (
            <Grid
              item
              xs={12}
              sm={4}
              md={3}
              lg={2}
              key={i}
              display="flex"
              justifyContent="center"
            >
              <ProductCard name={item.name} price={item.price} url={item.url} />
            </Grid>
          )
        })}
      </Grid>

      <Footer />
    </>
  )
}

export default LandingPage
