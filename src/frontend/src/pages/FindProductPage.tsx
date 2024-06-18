import { Grid, Card, CardContent, Typography, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Navbar from '../components/navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import FindProductCard from '../components/products/FindProductCard.tsx'
import { useItemStore } from "../stores/ItemStore.ts";
import { useEffect } from 'react';
import Item from '../models/Item.ts'
import { useState} from 'react'


export default function FindProductPage() {
  const navigate = useNavigate();
    const itemStore = useItemStore()
     const items: Item[] = itemStore.items

    useEffect( () => {
        itemStore.fetchItems()
    }, []);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('ALL');
    const [sortOrder, setSortOrder] = useState('ASC');

    const handleSearch = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleSortChange = (event) => {
        setSortOrder(event.target.value);
    };

    const filteredItems = items
        .filter((item) =>
            item.name.toLowerCase().includes(searchTerm) &&
            (selectedCategory === 'ALL' || item.category === selectedCategory)
        )
        .sort((a, b) => {
            if (sortOrder === 'ASC') {
            return a.price - b.price;
            } else {
            return b.price - a.price;
        }
     });

  
   return (
    <>
      <Navbar />

      <Grid container marginY={5} paddingX={2} justifyContent="center">
        <Grid item xs={12} md={12} lg={8} position={'relative'}>
          <Card>
            <CardContent>
              <Typography gutterBottom variant="h3" component="div">
                Znajdź produkt
              </Typography>
              <Card style={{ marginTop: '20px', padding: '20px' }} className="mb-6 gap-20">
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Wyszukaj produkt"
                                variant="outlined"
                                onChange={handleSearch}
                            />
                            </Grid>
                            <Grid item xs={6}>
                            <FormControl fullWidth>
                                <InputLabel id="category-select-label">Kategoria</InputLabel>
                                <Select
                                labelId="category-select-label"
                                id="category-select"
                                value={selectedCategory}
                                label="Kategoria"
                                onChange={handleCategoryChange}
                                >
                                <MenuItem value="ALL">Wszystkie</MenuItem>
                                <MenuItem value="BEER">Piwo</MenuItem>
                                <MenuItem value="CARPET">Dywany</MenuItem>
                                </Select>
                            </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                            <FormControl fullWidth>
                                <InputLabel id="sort-select-label">Sortuj według ceny</InputLabel>
                                <Select
                                labelId="sort-select-label"
                                id="sort-select"
                                value={sortOrder}
                                label="Sortuj według ceny"
                                onChange={handleSortChange}
                                >
                                <MenuItem value="ASC">Od najniższej</MenuItem>
                                <MenuItem value="DESC">Od najwyższej</MenuItem>
                                </Select>
                            </FormControl>
                            </Grid>
                        </Grid>
                    </Card>

                <Grid
                    container
                    justifyContent="center"
                    className="mt-6 px-6"
                    spacing={2}
                >
                {filteredItems.map((item, i) => {
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

          
        </Grid>
      </Grid>
    </>
  );
}
