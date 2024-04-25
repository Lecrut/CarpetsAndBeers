import { Box, Button } from '@mui/material'
import Carousel from 'react-material-ui-carousel'

export default function CarouselComponent(props) {
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
      <Carousel interval={10000}>
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
        {/*           bottom: '200px',
          left: '50%',
          transform: 'translateX(-50%)', */}
        Check it out!
      </Button>
    </>
  )
}

function Item(props) {
  return (
    // <Box position={'relative'}>
    //   <img src={props.item.url} alt="banner" />
    //   {/* <h2>{props.item.name}</h2> */}
    //   {/* <p>{props.item.description}</p> */}
    // </Box>
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box
        component="img"
        sx={{
          width: '100%',
        }}
        alt="Banner"
        src={props.item.url}
      />
      {/* <Button
        variant="contained"
        color="secondary"
        sx={{ color: 'white' }}
        className="rounded-r-md"
        // sx={{
        //   postion: 'absolute',
        //   bottom: '200px',
        //   left: '50%',
        //   transform: 'translateX(-50%)',
        // }}
      >
        Check it out!
      </Button> */}
    </Box>
  )
}
