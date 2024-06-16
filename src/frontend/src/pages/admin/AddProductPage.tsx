import Navbar from '../../components/navbar/Navbar';
import React from 'react';
import { Avatar, TextField, Button, MenuItem, Typography, Card, CardContent, Box, Grid } from '@mui/material';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { useUserStore } from '../../stores/UserStore'
import { useState } from 'react';
import Item from '../../models/Item';
import { useItemStore } from '../../stores/ItemStore';
import RenderItems from '../../components/products/ProductListItem'

const ProfilePage = () => {
  const user = useUserStore((state) => state.user)
  const itemStore = useItemStore()
  const items = itemStore.items  

  console.log(user)


  const handleEdit = () => {
    };
    const [newItem, setNewItem] = useState<Item>({
    id: 0,
    name: '',
    price: 0,
    category: 'CARPET',
    description: '',
    url: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewItem({
      ...newItem,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(newItem);
    await itemStore.addItem(newItem); // Use postItem from itemStore
  };

  const handleDisplayItems = async () => {
    await itemStore.fetchItems();
    
  };



  return (
    <>
      <Navbar />
      <Box display="flex" flexDirection="column" alignItems="center" minHeight="100vh" pt={2}>
        <Card sx={{ mt: 3, bgcolor: "grey.200"}}>
                <CardContent>
                  <Typography variant="h5">Dodaj nowy produkt</Typography>
                    <form onSubmit={handleSubmit}>
                      <TextField
                        fullWidth
                        margin="normal"
                        label="Nazwa produktu"
                        name="name"
                        onChange={handleChange}
                      />
                      <TextField
                        fullWidth
                        margin="normal"
                        label="Cena"
                        name="price"
                        type="number"
                        onChange={handleChange}
                      />
                      <TextField
                        fullWidth
                        margin="normal"
                        select
                        label="Kategoria"
                        name="category"
                        onChange={handleChange}
                      >
                        <MenuItem value="CARPET">Dywan</MenuItem>
                        <MenuItem value="BEER">Piwo</MenuItem>
                      </TextField>
                      <TextField
                        fullWidth
                        margin="normal"
                        label="Opis"
                        name="description"
                        onChange={handleChange}
                      />
                      <TextField
                        fullWidth
                        margin="normal"
                        label="URL obrazu"
                        name="url"
                        onChange={handleChange}
                      />
                      <Button type="submit" variant="contained" color="primary">
                        Dodaj produkt
                      </Button>
                    </form>
                </CardContent>
        </Card>
        <Card sx={{ mt: 3, bgcolor: "grey.200" }}>
            <button color="primary" type="button" onClick={handleDisplayItems} >Wyświetl produkty</button>
        </Card>
        <Card sx={{ mt: 3, bgcolor: "grey.200", maxWidth: '900', mx: 'auto' }}> 
          <CardContent>
            {RenderItems(items)}
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default ProfilePage;
