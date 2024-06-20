import Navbar from '../../components/navbar/Navbar'
import React, { useEffect } from 'react'
import {
  TextField,
  Button,
  MenuItem,
  Typography,
  Card,
  CardContent,
  Box,
} from '@mui/material'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { useUserStore } from '../../stores/UserStore'
import { useState } from 'react'
import Item from '../../models/Item'
import { useItemStore } from '../../stores/ItemStore'
import RenderItems from '../../components/products/ProductListItem'

const ProfilePage = () => {
  const user = useUserStore((state) => state.user)
  const itemStore = useItemStore()
  const items = itemStore.items

  console.log(user)

  const [newItem, setNewItem] = useState<Item>({
    id: 0,
    name: '',
    price: 0,
    category: 'CARPET',
    description: '',
    imgUrl: '',
  })

  const [imageURL, setImageURL] = useState<string>('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewItem({
      ...newItem,
      [e.target.name]: e.target.value,
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImageURL(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (event: {
    preventDefault: () => void
    target: { reset: () => void }
  }) => {
    event.preventDefault()
    if (newItem.name === '' || newItem.price === 0) {
      alert('Wypełnij wymagane pola')
      return
    }
    const itemToSend = { ...newItem, imgUrl: imageURL }
    console.log(itemToSend)
    await itemStore.addItem(itemToSend)
    event.target.reset()
  }

  const handleDisplayItems = async () => {
    await itemStore.fetchItems()
  }

  useEffect(() => {
    handleDisplayItems()
  }, [])

  return (
    <>
      <Navbar />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        minHeight="100vh"
        pt={2}
      >
        <Card sx={{ mt: 3, bgcolor: 'grey.200' }}>
          <CardContent>
            <Typography variant="h5">Dodaj nowy produkt</Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                margin="normal"
                label="Nazwa produktu*"
                name="name"
                onChange={handleChange}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Cena*"
                name="price"
                type="number"
                onChange={handleChange}
              />
              <TextField
                fullWidth
                margin="normal"
                select
                label="Kategoria"
                defaultValue="CARPET"
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

              <input
                type="file"
                onChange={handleFileChange}
                accept="image/png, image/jpeg"
              />
              {imageURL && (
                <img
                  src={imageURL}
                  alt="Podgląd"
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
              )}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className="pt-4"
              >
                Dodaj produkt
              </Button>
            </form>
          </CardContent>
        </Card>
        <Card sx={{ mt: 3, bgcolor: 'grey.200' }}>
          <button color="primary" type="button" onClick={handleDisplayItems}>
            Wyświetl produkty
          </button>
        </Card>
        <Card sx={{ my: 3, bgcolor: 'grey.200', maxWidth: '900', mx: 'auto' }}>
          <CardContent>{RenderItems(items)}</CardContent>
        </Card>
      </Box>
    </>
  )
}

export default ProfilePage
