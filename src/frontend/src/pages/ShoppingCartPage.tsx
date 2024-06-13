import { Button, TextField, Container, Grid, Box, Avatar, Card, CardContent, CardMedia,Typography } from '@mui/material';
import Navbar from '../components/navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import Item from '../models/Item'

export default function ShoppingCartPage() {
  const navigate = useNavigate();

  const items: Item[] = [
  {
    id: 1,
    name: 'Piwo Lager',
    price: 12.99,
    category: 'BEER',
    description: 'Chłodne, orzeźwiające piwo typu lager.',
    url: 'https://example.com/lager.jpg',
  },
  {
    id: 2,
    name: 'Dywan Perski',
    price: 199.99,
    category: 'CARPET',
    description: 'Luksusowy, ręcznie robiony dywan perski.',
    url: 'https://example.com/persian_carpet.jpg',
    },
  {
    id: 3,
    name: 'Dywan Perski',
    price: 199.99,
    category: 'CARPET',
    description: 'Luksusowy, ręcznie robiony dywan perski.',
    url: 'https://example.com/persian_carpet.jpg',
    },
  
  ];

  const getTotal = () => {
    return items.reduce((total, item) => total + item.price, 0);
  };
  
   return (
    <>
      <Navbar />
      <Container>
        <Typography variant="h2" align="left" gutterBottom>
          Twoje produkty w koszyku:
        </Typography>
        <Card style={{ marginTop: '20px', padding: '20px'}}>
          <Grid container spacing={3} >
            {items.map((item, index) => (
              <Grid item xs={6} sm={4} md={3} key={index}>
                <Card style={{ margin: 'auto' }}>
                  <CardMedia
                    component="img"
                    height="140"
                    src="public/temp_products/corona.png"
                    alt={item.name}
                  />
                  <CardContent>
                    <h2>{item.name}</h2>
                    <p>{item.description}</p>
                    <p>Cena: {item.price} zł</p>
                    <Button variant="contained" color="error" >
                      Usuń
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
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
      </Container>
    </>
  );
}
