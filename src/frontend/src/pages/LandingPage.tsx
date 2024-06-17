import { Grid } from '@mui/material'
import Carousel from '../components/Carousel'
import Footer from '../components/Footer'
import Navbar from '../components/navbar/Navbar'
import ProductCard from '../components/products/ProductCard.tsx'
import { useItemStore } from '../stores/ItemStore.ts'
import { useEffect } from 'react'

function LandingPage() {
  const itemStore = useItemStore()
  const items = itemStore.items

  useEffect( () => {
      itemStore.fetchItems()
  }, []);

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
        {items.map((item, i) => {
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
              <ProductCard
                id={item.id}
                name={item.name}
                price={item.price}
                src='src/frontend/public/temp_products/corona.png'
                category={item.category}
                description={item.description}
              />
            </Grid>
          )
        })}
      </Grid>

      <Footer />
    </>
  )
}

export default LandingPage
