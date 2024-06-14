import { Dialog, DialogTitle, DialogContent, DialogActions, Box, Typography, IconButton } from '@mui/material'
import Item from '../../models/Item.ts'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'

interface ProductDialogProps {
  open: boolean;
  handleClose: () => void;
  handleAddToCart: () => void;
  product: Item
}

export default function ProductDialog({ open, handleClose, product, handleAddToCart }: ProductDialogProps) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{product.name}</DialogTitle>
      <DialogContent className="text-center">
        <Box my={3}>
          <img src={product.url} alt={product.name} style={{ maxWidth: '100%' }} />
        </Box>
        <Typography>
          <h1 className='inline-block text-center font-bold'>Opis</h1>
        </Typography>
        <Typography variant="body1">{product.description}</Typography>
        <Typography>
          <h1 className='inline-block text-center font-bold'>Cena: {product.price} zł</h1>
        </Typography>
        <div className="flex justify-center mt-2">
          <IconButton onClick={handleAddToCart}>
            <AddShoppingCartIcon />
          </IconButton>
        </div>
      </DialogContent>
      <DialogActions>
        <button onClick={handleClose}>Zamknij</button>
      </DialogActions>
    </Dialog>
  );
}