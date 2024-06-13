import { Box, IconButton, Paper } from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import FavoriteIcon from '@mui/icons-material/Favorite'
import Item from '../models/Item.ts'
import React from 'react'
import ProductDialog from './ProductDialog.tsx'



export default function ProductCard({name, price, url}: Item) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    console.log('otwarcie', open)
    setOpen(true);
    console.log('otwarcie 2', open)
  };

  const handleClose = () => {
    console.log('nad glowa', open)
    setOpen(false);
    console.log('open', open)
  };



  return (
    <Paper
      elevation={3}
      square={false}
      className="size-72 cursor-pointer p-3 duration-500 ease-in-out hover:scale-105 hover:transform hover:transition-transform"
      sx={{ borderRadius: 5 }}
      onClick={handleClickOpen}
    >
      <div className="flex justify-between">
        <h1 className="inline-block text-center font-bold">{name}</h1>
        <IconButton
          sx={{
            '&:hover': {
              color: '#F44336',
            },
          }}
          disableRipple={true}
        >
          <FavoriteIcon />
        </IconButton>
      </div>

      <p>{price} zł</p>

      <IconButton>
        <AddShoppingCartIcon />
      </IconButton>

      <Box
        component="img"
        sx={{
          height: '60%',
        }}
        margin="auto"
        alt={name}
        src={url}
      />
      <ProductDialog
        open={open}
        onClose={handleClose}
      />
    </Paper>
  )
}
