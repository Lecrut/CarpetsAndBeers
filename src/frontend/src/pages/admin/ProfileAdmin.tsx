import Navbar from '../../components/navbar/Navbar';
import React from 'react';
import { Avatar, Typography, Card, CardContent, Box, Grid } from '@mui/material';
import PurchaseCard from '../../components/PurchaseCard';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { useUserStore } from '../../stores/UserStore'
import { useState } from 'react';
import CategoryType from '../../models/Item';
import Item from '../../models/Item';

const ProfilePage = () => {
  const user = useUserStore((state) => state.user)
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
    const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(newItem);
    // Tutaj możesz dodać logikę do dodawania nowego produktu
  };  

  return (
    <>
      <Navbar />
      <Box display="flex" justifyContent="center" alignItems="flex-start" minHeight="100vh" pt={2}>
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={8} md={6}>
            <Card sx={{ mt: 3, bgcolor: "grey.200"}}>
              <CardContent>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Avatar style={{ backgroundColor: '#F5980E'}}>
                    {user?.name[0]}
                  </Avatar>
                  <Typography variant="h4">{user?.name}</Typography>
                  <Typography variant="subtitle1">{user?.email}</Typography>
                  <button onClick={handleEdit}>Zmień hasło</button>
                </Box>
              </CardContent>
            </Card>
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Nazwa produktu" onChange={handleChange} />
               <input type="number" name="price" placeholder="Cena" onChange={handleChange} />
                          <select name="category" >
                              <option value="CARPET">Dywan</option>
                        <option value="BEER">Piwo</option>
                    </select>
                    <input type="text" name="description" placeholder="Opis" onChange={handleChange} />
                    <input type="text" name="url" placeholder="URL obrazu" onChange={handleChange} />
                    <button type="submit">Dodaj produkt</button>
                </form>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ProfilePage;
