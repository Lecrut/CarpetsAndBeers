import Navbar from "../components/navbar/Navbar.tsx";
import {Box, Button, Card, CardContent, Grid, Step, StepLabel, Stepper, TextField, Typography} from "@mui/material";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useItemStore} from "../stores/ItemStore.ts";

export default function FinalOrderPage() {
    const navigate = useNavigate();

    const itemStore = useItemStore()
    const shoppingCart = itemStore.shoppingCart

    const steps = ['Adres dostawy', 'Podsumowanie'];
    const [activeStep, setActiveStep] = useState(0);
    const [shippingData, setShippingData] = useState({
        street: '',
        house: '',
        flat: '',
        city: '',
        zip: '',
    });

    const handleNext = () => {
        activeStep === 1 ? navigate('/final') : setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        activeStep === 0 ? navigate('/shopping-cart') :setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleShippingChange = (event: { target: { name: any; value: any; }; }) => {
        setShippingData({ ...shippingData, [event.target.name]: event.target.value });
    };

    const getTotal = () => {
        return shoppingCart.reduce((total, item) => total + item.item.price*item.quantity, 0);
    };

    return (
        <>
            <Navbar />

            <Grid container marginTop={5} paddingX={2} justifyContent="center">
                <Grid item xs={12} md={12} lg={8} position={'relative'}>
                    <Card>
                        <CardContent>

                            <Typography gutterBottom variant="h3" component="div">
                                Finalizacja zamówienia
                            </Typography>

                            <Stepper activeStep={activeStep}>
                                {steps.map((label) => (
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>

                            <form>
                                {activeStep === 0 && (
                                    <Box sx={{mt: 2}}>
                                        <TextField
                                            label="Ulica"
                                            name="street"
                                            value={shippingData.street}
                                            onChange={handleShippingChange}
                                            fullWidth
                                            margin="normal"
                                        />
                                        <TextField
                                            label="Numer domu"
                                            name="house"
                                            value={shippingData.house}
                                            onChange={handleShippingChange}
                                            fullWidth
                                            margin="normal"
                                        />
                                        <TextField
                                            label="Numer mieszkania"
                                            name="flat"
                                            value={shippingData.flat}
                                            onChange={handleShippingChange}
                                            fullWidth
                                            margin="normal"
                                        />
                                        <TextField
                                            label="Miasto"
                                            name="city"
                                            value={shippingData.city}
                                            onChange={handleShippingChange}
                                            fullWidth
                                            margin="normal"
                                        />
                                        <TextField
                                            label="Kod pocztowy"
                                            name="zip"
                                            value={shippingData.zip}
                                            onChange={handleShippingChange}
                                            fullWidth
                                            margin="normal"
                                        />
                                    </Box>
                                )}
                                {activeStep === 1 && (
                                    <Box sx={{my: 4}}>
                                        <Grid container>
                                            <Grid
                                                item
                                                xs={12}
                                                sm={6}
                                            >
                                                <Typography gutterBottom variant="h6" component="div">
                                                    Adres
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary" component="p">
                                                    {shippingData.street} {shippingData.house}/{shippingData.flat}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary" component="p">
                                                    {shippingData.zip} {shippingData.city}
                                                </Typography>
                                            </Grid>
                                            <Grid
                                                item
                                                xs={12}
                                                sm={6}
                                            >
                                                <Typography sx={{my: 2}} variant="h6" component="div">
                                                    Produkty
                                                </Typography>
                                                {shoppingCart.map((item, i) => {
                                                    return (
                                                        <Typography sx={{my: 2}} variant="body2" component="div">
                                                            {i+1}. {item.item.name} {item.item.price} zł - {item.quantity} szt
                                                        </Typography>
                                                    )
                                                })}

                                                <Typography variant="h6" component="div">
                                                    Suma: {getTotal()} zł
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                )}
                                <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={handleBack}
                                        sx={{mr: 1}}
                                    >
                                        Powrót
                                    </Button>
                                    <Box sx={{flex: '1 1 auto'}}/>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={handleNext}
                                        disabled={activeStep === 2 || !shippingData.city || !shippingData.zip || !shippingData.address}
                                    >
                                        {activeStep === steps.length - 1 ? 'Opłać' : 'Następny'}
                                    </Button>
                                </Box>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    )
}