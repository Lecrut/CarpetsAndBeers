import { Card, CardContent, Grid, Typography } from '@mui/material'
import Navbar from '../components/navbar/Navbar'
// import Footer from '../components/Footer.tsx'

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <Grid container marginTop={5} paddingX={2} justifyContent="center">
        <Grid item xs={12} md={12} lg={6} position="relative">
          <Card>
            <CardContent>
              <Typography gutterBottom variant="h3" component="div">
                Kontakt
              </Typography>
              <Typography gutterBottom variant="h4" component="div">
                Beers&Carpets
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Adres: ul. Wólczańska 221, budynek B18, 93-005 Łódź
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Telefon: +48 22 444 02 22
              </Typography>

              <iframe className="pt-4"src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2470.2819978446696!2d19.45348957693126!3d51.74616679323231!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471a34dcff7f1fdb%3A0xdd2559909b47745f!2zV8OzbGN6YcWEc2thIDIyMS9idWR5bmVrIEIxOCwgOTMtMDA1IMWBw7Nkxbo!5e0!3m2!1spl!2spl!4v1718821424448!5m2!1spl!2spl" width="100%" height="500px" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>

            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* <Footer /> */}
    </>
  )
}
