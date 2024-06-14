import Navbar from '../components/navbar/Navbar'
import { Card, CardContent, Grid, Typography } from '@mui/material'
import Item from '../models/Item.ts'
import WishedProductCard from '../components/products/WishedProductCard.tsx'

export default function WishListPage() {

  const wishedItems: Item[] = [
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

      <Grid container marginTop={5} paddingX={2} justifyContent="center">
        <Grid item xs={12} md={12} lg={8} position={'relative'}>
          <Card>
            <CardContent>
              <Typography gutterBottom variant="h3" component="div">
                Lista życzeń
              </Typography>
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                className="mt-6 gap-20"
              >
                {wishedItems.map((item, i) => {
                  return (
                    <Grid
                      item
                      xs={12}
                      sm={4}
                      md={3}
                      lg={3}
                      key={i}
                      display="flex"
                      justifyContent="center"
                    >
                      <WishedProductCard
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
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}
