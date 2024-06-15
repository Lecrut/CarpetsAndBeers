import Navbar from '../../components/navbar/Navbar';
import React from 'react';
import { Avatar, Typography, Card, CardContent, Box, Grid } from '@mui/material';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { useUserStore } from '../../stores/UserStore'

const ProfilePage = () => {
  const user = useUserStore((state) => state.user)
  console.log(user)

  return (
    <>
      <Navbar />
      <Box display="flex" justifyContent="center" alignItems="flex-start" minHeight="100vh" pt={2}>
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={8} md={6}>
            <Card sx={{ mt: 3, bgcolor: "grey.200"}}>
              <CardContent>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Avatar style={{ backgroundColor: '#F5980E'}}>
                    {user?.name[0]}
                  </Avatar>
                  <Typography variant="h4">{user?.name}</Typography>
                  <Typography variant="subtitle1">{user?.email}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ProfilePage;
