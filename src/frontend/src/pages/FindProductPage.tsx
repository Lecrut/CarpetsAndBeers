import { Button, Grid, Box, Card, CardContent, Typography } from '@mui/material';
import Navbar from '../components/navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import BuyProductCard from '../components/products/BuyProductCard.tsx'
import FindProductCard from '../components/products/FindProductCard.tsx'
import { useItemStore } from "../stores/ItemStore.ts";
import { useEffect } from 'react';
import Item from '../models/Item.ts'


export default function FindProductPage() {
  const navigate = useNavigate();
    const itemStore = useItemStore()
     const items: Item[] = itemStore.items

    useEffect( () => {
        itemStore.fetchItems()
    }, []);

  
   return (
    <>
      <Navbar />

      <Grid container marginTop={5} paddingX={2} justifyContent="center">
        <Grid item xs={12} md={12} lg={8} position={'relative'}>
          <Card>
            <CardContent>
              <Typography gutterBottom variant="h3" component="div">
                Znajdź produkt
              </Typography>
              <Grid
                container
                justifyContent="center"
                className="mt-6"
                spacing={2}
              >
                {items.map((item, i) => {
                  return (
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={12}
                      lg={12}
                      key={i}
                      display="flex"
                      justifyContent="center"
                    >
                          <FindProductCard
                            id={item.id}
                            name={item.name}
                            price={item.price}
                            url={item.url}
                            category={item.category}
                            description={item.description}>
                        </FindProductCard>
                    </Grid>
                  )
                })}
              </Grid>
            </CardContent>
          </Card>

          <Card style={{ marginTop: '20px', padding: '20px' }}>
            
        
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
