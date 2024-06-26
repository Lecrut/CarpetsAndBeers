import React, { useEffect, useState } from 'react'
import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material'
import { Carousel } from 'react-responsive-carousel'
import PurchaseCard from '../components/PurchaseCard'
import Navbar from '../components/navbar/Navbar'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { useUserStore } from '../stores/UserStore'
import type Order from '../models/Order'
import { useOrderStore } from '../stores/OrderStore'

function ProfilePage() {
  const user = useUserStore(state => state.user)
  console.log(user)
  const orderStore = useOrderStore()
  const orders = orderStore.allUserOrders

  useEffect(() => {
    console.log(user)
    orderStore.fetchAllOrders(user.id)
    console.log(orders)
  }, [])

  return (
    <>
      <Navbar />
      <Box display="flex" justifyContent="center" alignItems="flex-start" minHeight="100vh" pt={2}>
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={8} md={6}>
            <Card sx={{ mt: 3, bgcolor: 'grey.200' }}>
              <CardContent>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Avatar style={{ backgroundColor: '#F5980E' }}>
                    {user?.name[0]}
                  </Avatar>
                  <Typography variant="h4">{user?.name}</Typography>
                  <Typography variant="subtitle1">{user?.email}</Typography>
                </Box>
              </CardContent>
            </Card>
            <Typography variant="h5" sx={{ mt: 3 }}>Twoje ostatnie zakupy</Typography>
            {/* <Carousel showThumbs={false}>
              {purchases.map((purchase, index) => (
                <div style={{ justifyContent: 'center', alignItems: 'center', height: '100%' }} key={index}>
                  <PurchaseCard {...purchase} />
                </div>
              ))}
            </Carousel> */}
            <Carousel showThumbs={false}>
              {orders.map(order => (
                <div key={order.id}>
                  <Typography variant="body1">
                    Data płatności:
                    {' '}
                    { order.orderDate.slice(0, 10) }
                  </Typography>
                  <Typography variant="body1">
                    Zapłacony rachunek:
                    {' '}
                    {order.totalPrice}
                    {' '}
                    zł
                  </Typography>
                </div>
              ))}
            </Carousel>

          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default ProfilePage
