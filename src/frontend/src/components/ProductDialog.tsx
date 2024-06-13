import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle
} from '@mui/material'


export interface ProductDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function ProductDialog(props: ProductDialogProps) {
  const { onClose, open } = props;

  const handleClose = () => {
    console.log('pizda')
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Set backup account</DialogTitle>

      <DialogActions>
        <Button onClick={handleClose}>Zamknij</Button>
      </DialogActions>
    </Dialog>
  );
}