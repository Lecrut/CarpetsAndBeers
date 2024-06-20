import React from 'react'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import FavoriteIcon from '@mui/icons-material/Favorite'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import Box from '@mui/material/Box'
import ProductDialog from './ProductDialog'
import Item from '../../models/Item'
import { useItemStore } from '../../stores/ItemStore'
import { SetStateAction, useState } from 'react'

export default function FindProductCard(item: Item) {
  const [open, setOpen] = useState(false)
  const itemStore = useItemStore()
  const handleOpenDialog = () => {
    setOpen(true)
  }

  const handleCloseDialog = () => {
    setOpen(false)
  }

  const handleAddToFavourite = () => {
    itemStore.addToWishList(item)
  }

  const handleAddToCart = () => {
    itemStore.addToShoppingCart(item)
  }

  return (
    <>
      <Paper
        elevation={3}
        className="w-full p-3 duration-500 ease-in-out hover:scale-105 hover:transform hover:transition-transform"
        sx={{ borderRadius: 5, height: 'auto', width: '100%' }}
      >
        <div className="mb-4 flex items-center justify-between">
          <h1 className="font-bold">{item.name}</h1>
          <div>
            <IconButton
              sx={{
                '&:hover': {
                  color: '#F44336',
                },
              }}
              disableRipple={true}
              onClick={handleAddToFavourite}
            >
              <FavoriteIcon />
            </IconButton>
            <IconButton onClick={handleAddToCart}>
              <AddShoppingCartIcon />
            </IconButton>
          </div>
        </div>

        <p className="text-md mb-4">{item.price} zł</p>

        <Box
          className="cursor-pointer"
          component="img"
          sx={{
            maxHeight: '150px',
            objectFit: 'contain',
            width: '100%',
          }}
          alt={item.name}
          src={item.imgUrl}
          onClick={handleOpenDialog}
        />
      </Paper>

      <ProductDialog
        open={open}
        handleClose={handleCloseDialog}
        handleAddToFavourite={handleAddToFavourite}
        handleAddToCart={handleAddToCart}
        product={item}
      />
    </>
  )
}
