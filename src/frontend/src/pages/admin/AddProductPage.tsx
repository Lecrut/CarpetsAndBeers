import Navbar from '../../components/navbar/Navbar';
import React from 'react';
import { Avatar, Typography, Card, CardContent, Box, Grid } from '@mui/material';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { useUserStore } from '../../stores/UserStore'
import { useState } from 'react';
import Item from '../../models/Item';
import { useItemStore } from '../../stores/ItemStore';

const ProfilePage = () => {
  const user = useUserStore((state) => state.user)
  const itemStore = useItemStore()

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
  };  

  return (
    <>
      <Navbar />
      <Box display="flex" justifyContent="center" alignItems="flex-start" minHeight="100vh" pt={2}>
        <Card sx={{ mt: 3, bgcolor: "grey.200"}}>
                <CardContent>
                  <Typography variant="h5">Dodaj nowy produkt</Typography>
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
                </CardContent>
              </Card>
      </Box>
    </>
  );
};

export default ProfilePage;
