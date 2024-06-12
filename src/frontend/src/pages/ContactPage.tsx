import Navbar from '../components/navbar/Navbar'
import Footer from '../components/Footer.tsx'
import { Card, CardContent, Grid, Typography } from '@mui/material'

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <Grid container marginTop={5} paddingX={2} justifyContent="center">
        <Grid item xs={12} md={12} lg={6} position={'relative'}>
          <Card>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Kontakt
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                Bears&Carpets
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Adres: ul. Wólczańska 221, budynek B18, 93-005 Łódź
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Telefon: +48 22 444 02 22
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/*<Footer />*/}
    </>
  )
}
