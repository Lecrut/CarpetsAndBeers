import { Box, Button } from '@mui/material'
import Carousel from 'react-material-ui-carousel'

export default function CarouselComponent() {
  const items = [
    {
      name: 'Random Name #1',
      description: 'Probably the most random thing you have ever seen!',
      url: '/images/banner1.jpg',
    },
    {
      name: 'Random Name #2',
      description: 'Hello World!',
      url: '/images/banner2.jpg',
    },
  ]

  return (
    <>
      <Carousel interval={5000}>
        {items.map((item, i) => (
          <Item key={i} item={item} />
        ))}
      </Carousel>
      <Button
        variant="contained"
        color="secondary"
        className="rounded-r-md"
        sx={{
          postion: 'absolute',
          bottom: '50%',
          left: '50%',
          color: 'white',
          zIndex: 1000,
          transform: 'translateX(-50%)',
        }}
      >
        Check it out!
      </Button>
    </>
  )
}

interface ItemProps {
  item: {
    name: string
    description: string
    url: string
  }
}

function Item(props: ItemProps) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box
        component="img"
        sx={{
          width: '100%',
        }}
        alt="Banner"
        src={props.item.url}
      />
    </Box>
  )
}
