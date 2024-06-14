import { useState } from 'react';
import {
  Paper,
  IconButton,
  Box,
  DialogTitle,
  DialogContent,
  Typography,
  DialogActions,
  Dialog,
  TextField
} from '@mui/material'
import { CategoryType } from '../models/Item.ts'
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add'
import { IoTrashBin } from 'react-icons/io5'


interface BuyProductProps {
  id: number,
  name: string,
  price: number,
  category: CategoryType,
  description: string,
  url?: string,
  value: number
}

export default function BuyProductCard({name, price, url, description, value}: BuyProductProps) {
  const [open, setOpen] = useState(false);

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleIncrement = () => {
    value = value + 1;
  };

  const handleDecrement = () => {
    value = value - 1;
  };

  return (
    <>
      <div>
      <Paper
        elevation={3}
        square={false}
        className="size-72 p-3 duration-500 ease-in-out hover:scale-105 hover:transform hover:transition-transform"
        sx={{ borderRadius: 5 }}
      >
        <div className="flex justify-between">
          <h1 className="inline-block text-center font-bold">{name}</h1>
          <IconButton
            sx={{
              '&:hover': {
                color: '#F44336'
              }
            }}
            disableRipple={true}
          >
            <IoTrashBin />
          </IconButton>
        </div>

        <div className="flex justify-center">
          <p>{price} zł</p>
        </div>


        <Box
          className="cursor-pointer"
          component="img"
          sx={{
            height: '60%'
          }}
          margin="auto"
          alt={name}
          src={url}
          onClick={handleOpenDialog}
        />

      </Paper>

      <div className="flex my-5 mx-4 justify-between">
        <IconButton onClick={handleDecrement}>
          <RemoveIcon />
        </IconButton>

        <TextField
          value={value}
          onChange={(e) => (value = Number(e.target.value))}
          type="number"
          variant="outlined"
          style={{ width: '100px', margin: '0 10px' }}
        />

        <IconButton onClick={handleIncrement}>
          <AddIcon />
        </IconButton>
      </div>
      </div>

      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>{name}</DialogTitle>
        <DialogContent className="text-center">
          <Box my={3}>
            <img src={url} alt={name} style={{ maxWidth: '100%' }} />
          </Box>
          <Typography>
            <h1 className="inline-block text-center font-bold">Opis</h1>
          </Typography>
          <Typography variant="body1">{description}</Typography>
          <Typography>
            <h1 className='inline-block text-center font-bold'>Cena: {price} zł</h1>
          </Typography>

        </DialogContent>
        <DialogActions>
          <button onClick={handleCloseDialog}>Zamknij</button>
        </DialogActions>
      </Dialog>
    </>
  );
}
