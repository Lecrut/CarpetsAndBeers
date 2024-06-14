import { Button, Grid, Box, Card, CardContent, Typography } from '@mui/material';
import Navbar from '../components/navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import Item from '../models/Item'
import BuyProductCard from '../components/products/BuyProductCard.tsx'

export default function ShoppingCartPage() {
  const navigate = useNavigate();

  const items: Item[] = [
  {
    id: 1,
    name: 'Piwo Lager',
    price: 12.99,
    category: 'BEER',
    description: 'Chłodne, orzeźwiające piwo typu lager.',
    url: '/temp_products/corona.png',
  },
  {
    id: 2,
    name: 'Dywan Perski',
    price: 199.99,
    category: 'CARPET',
    description: 'Luksusowy, ręcznie robiony dywan perski.',
    url: '/temp_products/corona.png',
    },
  {
    id: 3,
    name: 'Dywan Perski',
    price: 199.99,
    category: 'CARPET',
    description: 'Luksusowy, ręcznie robiony dywan perski.',
    url: '/temp_products/corona.png',
    },
  
  ];

  const amounts: number[] = [10, 2 , 3]

  const getTotal = () => {
    return items.reduce((total, item, i) => total + item.price*amounts[i], 0);
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
                      lg={3}
                      key={i}
                      display="flex"
                      justifyContent="center"
                    >
                      <BuyProductCard
                        id={item.id}
                        name={item.name}
                        price={item.price}
                        url={item.url}
                        category={item.category}
                        description={item.description}
                        value={amounts[i]}
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
              <Button variant="contained" color="secondary" onClick={() => navigate('/checkout')}>
                Przejdź do płatności
              </Button>
            </Box>
          </Card>
        </Grid>
      </Grid>S
    </>
  );
}
