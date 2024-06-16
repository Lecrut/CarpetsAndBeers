import { Grid } from '@mui/material'
import Carousel from '../components/Carousel'
import Footer from '../components/Footer'
import Navbar from '../components/navbar/Navbar'
import ProductCard from '../components/products/ProductCard.tsx'
import Item from '../models/Item.ts'

function LandingPage() {
  const recommendedItems: Item[] = [
    {
      id: 1,
      name: 'Lokalne piwo',
      price: 15,
      category: 'BEER',
      description: 'Ciemne piwo o intensywnym smaku palonego słodu, z nutami kawy, czekolady i karmelu.',
      url: '/temp_products/corona.png',
    },
    {
      id: 2,
      name: 'Lokalne piwo 2',
      price: 35,
      category: 'BEER',
      description: 'IPA to styl piwa, który jest charakteryzowany przez wyraźny chmielowy smak i aromat. Jest zwykle mocniejsze i bardziej gorzkie niż inne style piwa.',
      url: '/temp_products/corona.png',
    },
    {
      id: 3,
      name: 'Dywan',
      price: 75,
      category: 'CARPET',
      description: 'Perskie dywany są ręcznie tkane i znane z bogatych wzorów, intensywnych kolorów i wysokiej jakości materiałów.',
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
              <ProductCard
                id={item.id}
                name={item.name}
                price={item.price}
                url={item.url}
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
