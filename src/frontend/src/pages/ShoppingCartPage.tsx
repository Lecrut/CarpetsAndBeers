import { Button, Grid, Box, Card, CardContent, Typography } from '@mui/material';
import Navbar from '../components/navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import BuyProductCard from '../components/products/BuyProductCard.tsx'
import {useItemStore} from "../stores/ItemStore.ts";
import {useUserStore} from "../stores/UserStore.ts";

export default function ShoppingCartPage() {
  const navigate = useNavigate();
  const userStore = useUserStore()
  const user = userStore.user
  const itemStore = useItemStore()
  const shoppingCart = itemStore.shoppingCart

  const getTotal = () => {
    return shoppingCart.reduce((total, item) => total + item.item.price*item.quantity, 0);
  };
  
   return (
    <>
      <Navbar />

      <Grid container marginTop={5} paddingX={2} justifyContent="center">
        <Grid item xs={12} md={12} lg={8} position={'relative'}>
          <Card>
            <CardContent>
              <Typography gutterBottom variant="h3" component="div">
                Koszyk
              </Typography>

              <Typography gutterBottom variant="h5" component="div">
                {!shoppingCart.length && "Brak rzeczy w koszyku."}
              </Typography>

              <Grid
                container
                justifyContent="center"
                alignItems="center"
                className="mt-6 gap-20"
              >
                {shoppingCart.map((item, i) => {
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
                      <BuyProductCard
                        item={item.item}
                        quantity={item.quantity}
                      />
                    </Grid>
                  )
                })}
              </Grid>
            </CardContent>
          </Card>

          <Card style={{ marginTop: '20px', padding: '20px' }}>
            <Typography variant="h6" align="right" gutterBottom>
              Suma: {getTotal()} zł
            </Typography>
            <Box display="flex" justifyContent="flex-end">
              {user ?
                  <Button variant="contained" color="secondary" disabled={getTotal()===0} onClick={() => navigate('/final-order')}>
                    Przejdź do płatności
                  </Button>
                  :
                  <Button variant="contained" color="secondary" disabled={getTotal()===0} onClick={() => navigate('/login')}>
                    Zaloguj się
                  </Button>
              }
            </Box>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
