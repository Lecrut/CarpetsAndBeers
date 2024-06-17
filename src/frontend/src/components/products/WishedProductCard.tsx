import { useState } from 'react';
import { Paper, IconButton, Box } from '@mui/material';
import WishedProductDialog from './WishedProductDialog.tsx';
import Item from '../../models/Item.ts'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import { IoTrashBin } from 'react-icons/io5'
import {useItemStore} from "../../stores/ItemStore.ts";

export default function WishedProductCard(item : Item) {
  const [open, setOpen] = useState(false);
  const itemStore = useItemStore()

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleRemoveFromFavourite = () => {
      itemStore.removeFromWishList(item)
    console.log('add to favourite ', item.name)
  }

  const handleAddToCart = () => {
    console.log('add to cart ', item.name)
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
            onClick={handleRemoveFromFavourite}
          >
            <IoTrashBin />
          </IconButton>
        </div>

        <p>{item.price} zł</p>

        <IconButton onClick={handleAddToCart}>
          <AddShoppingCartIcon />
        </IconButton>

        <Box
          className="cursor-pointer"
          component="img"
          sx={{
            height: '60%',
          }}
          margin="auto"
          alt={item.name}
          src={item.url}
          onClick={handleOpenDialog}
        />
      </Paper>

      <WishedProductDialog
        open={open}
        handleClose={handleCloseDialog}
        handleAddToCart={handleAddToCart}
        product={item}
      />
    </>
  );
}
