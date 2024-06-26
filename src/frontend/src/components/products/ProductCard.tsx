import { useState } from 'react'
import { Paper, IconButton, Box } from '@mui/material'
import ProductDialog from './ProductDialog.tsx'
import Item from '../../models/Item.ts'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { useItemStore } from '../../stores/ItemStore.ts'

export default function ProductCard(item: Item) {
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
        square={false}
        className="size-72 p-3 duration-500 ease-in-out hover:scale-105 hover:transform hover:transition-transform"
        sx={{ borderRadius: 5 }}
      >
        <div className="flex justify-between">
          <h1 className="inline-block text-center font-bold">{item.name}</h1>
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
        </div>

        <p>{item.price} zł</p>

        <IconButton onClick={handleAddToCart}>
          <AddShoppingCartIcon />
        </IconButton>

        {item.imgUrl && (
          <Box
            className="cursor-pointer"
            component="img"
            sx={{
              height: '60%',
            }}
            margin="auto"
            alt={item.name}
            src={item.imgUrl}
            onClick={handleOpenDialog}
          />
        )}
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
