import { useState } from 'react';
import { Paper, IconButton, Box } from '@mui/material';
import ProductDialog from './ProductDialog.tsx';
import Item from '../models/Item.ts'
import FavoriteIcon from '@mui/icons-material/Favorite'

export default function ProductCard({ name, price, url }: Item) {
  const [open, setOpen] = useState(false);

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <>
      <Paper
        elevation={3}
        square={false}
        className="size-72 cursor-pointer p-3 duration-500 ease-in-out hover:scale-105 hover:transform hover:transition-transform"
        sx={{ borderRadius: 5 }}
        onClick={handleOpenDialog}
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
      </Paper>

      <ProductDialog
        open={open}
        handleClose={handleCloseDialog}
        name={name}
        price={price}
      />
    </>
  );
}
