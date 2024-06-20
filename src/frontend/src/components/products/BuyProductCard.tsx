import { useState } from 'react'
import {
  Paper,
  IconButton,
  Box,
  DialogTitle,
  DialogContent,
  Typography,
  DialogActions,
  Dialog,
  TextField,
} from '@mui/material'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
import { IoTrashBin } from 'react-icons/io5'
import { useItemStore } from '../../stores/ItemStore.ts'
import { CartItem } from '../../models/CartItem.ts'

export default function BuyProductCard({ item, quantity }: CartItem) {
  const [open, setOpen] = useState(false)
  const itemStore = useItemStore()

  const handleOpenDialog = () => {
    setOpen(true)
  }

  const handleCloseDialog = () => {
    setOpen(false)
  }

  const handleIncrement = () => {
    itemStore.increaseAmountInShoppingCart(item)
  }

  const handleDecrement = () => {
    itemStore.decreaseAmountInShoppingCart(item)
  }

  const handleRemoveFromCart = () => {
    itemStore.removeFromShoppingCart(item)
  }

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
            <h1 className="inline-block text-center font-bold">{item.name}</h1>
            <IconButton
              sx={{
                '&:hover': {
                  color: '#F44336',
                },
              }}
              disableRipple={true}
              onClick={handleRemoveFromCart}
            >
              <IoTrashBin />
            </IconButton>
          </div>

          <div className="flex justify-center">
            <p>{item.price} zł</p>
          </div>

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
        </Paper>

        <div className="mx-4 my-5 flex justify-between">
          <IconButton onClick={handleDecrement}>
            <RemoveIcon />
          </IconButton>

          <TextField
            value={quantity}
            onChange={(e) => (quantity = Number(e.target.value))}
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
        <DialogTitle>{item.name}</DialogTitle>
        <DialogContent className="text-center">
          <Box my={3}>
            <img
              src={item.imgUrl}
              alt={item.name}
              style={{ maxWidth: '100%' }}
            />
          </Box>
          <Typography>
            <h1 className="inline-block text-center font-bold">Opis</h1>
          </Typography>
          <Typography variant="body1">{item.description}</Typography>
          <Typography>
            <h1 className="inline-block text-center font-bold">
              Cena: {item.price} zł
            </h1>
          </Typography>
        </DialogContent>
        <DialogActions>
          <button onClick={handleCloseDialog}>Zamknij</button>
        </DialogActions>
      </Dialog>
    </>
  )
}
