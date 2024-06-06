import {Paper, Typography } from '@mui/material';

interface Item {
  name: string;
  quantity: number;
}

interface PurchaseCardProps {
  date: string;
  items: Item[];
  paymentMethod: string;
  price: number;
}

export default function PurchaseCard({ date, items, paymentMethod, price }: PurchaseCardProps) {
  return (
    <Paper elevation={3} square={false} sx={{ borderRadius: 5, p: 3, mt: 2,  bgcolor: 'grey.200' }}>
      <Typography variant="h6">Data zakupu: {date}</Typography>
      {items.map((item, index) => (
        <Typography key={index} variant="body1">
             {item.quantity}x {item.name} 
        </Typography>
      ))}
      <Typography variant="body1">Metoda płatności: {paymentMethod}</Typography>
      <Typography variant="body1">Zapłacony rachunek: {price} zł</Typography>
    </Paper>
  );
}
