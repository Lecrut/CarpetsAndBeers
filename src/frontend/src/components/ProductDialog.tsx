import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

interface ProductDialogProps {
  open: boolean;
  handleClose: () => void;
  name: string;
  price: number;
}

export default function ProductDialog({ open, handleClose, name, price }: ProductDialogProps) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Product Details</DialogTitle>
      <DialogContent>
        {/* Dodaj dodatkowe szczegóły tutaj */}
        {/* Na przykład: */}
        <p>{name}</p>
        <p>Cena: {price} zł</p>
      </DialogContent>
      <DialogActions>
        {/* Dodaj akcje (przyciski) tutaj */}
        {/* Na przykład: */}
        <button onClick={handleClose}>Zamknij</button>
      </DialogActions>
    </Dialog>
  );
}