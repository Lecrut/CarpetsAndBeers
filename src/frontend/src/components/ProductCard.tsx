import { Box, IconButton, Paper } from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import FavoriteIcon from '@mui/icons-material/Favorite'

interface ProductCardProps {
  name: string
  url: string
  price: number
}

export default function ProductCard({ name, url, price }: ProductCardProps) {
  return (
    <Paper
      elevation={3}
      square={false}
      className="size-72 cursor-pointer p-3 duration-500 ease-in-out hover:scale-105 hover:transform hover:transition-transform"
      sx={{ borderRadius: 5 }}
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
          height: 233,
          width: 350,
          maxHeight: { xs: 233, md: 167 },
          maxWidth: { xs: 350, md: 250 },
        }}
        alt={name}
        src={url}
      />
    </Paper>
  )
}
