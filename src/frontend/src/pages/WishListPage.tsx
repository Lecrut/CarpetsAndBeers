import Navbar from '../components/navbar/Navbar'
import { Card, CardContent, Grid, Typography } from '@mui/material'
import WishedProductCard from '../components/products/WishedProductCard.tsx'
import { useItemStore } from '../stores/ItemStore.ts'

export default function WishListPage() {
  const itemStore = useItemStore()
  const wishList = itemStore.wishList

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

              <Typography gutterBottom variant="h5" component="div">
                {!wishList.length && 'Brak rzeczy w liście życzeń.'}
              </Typography>

              <Grid
                container
                justifyContent="center"
                alignItems="center"
                className="mt-6 gap-20"
              >
                {wishList.map((item, i) => {
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
                        imgUrl={item.imgUrl}
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
