import Navbar from "../components/navbar/Navbar.tsx";
import {Box, Button, Step, StepLabel, Stepper, TextField} from "@mui/material";
import {useState} from "react";

export default function FinalOrderPage() {

    const steps = ['Shipping Address', 'Recipient Details'];
    const [activeStep, setActiveStep] = useState(0);
    const [shippingData, setShippingData] = useState({
        address: '',
        city: '',
        zip: '',
    });
    const [recipientData, setRecipientData] = useState({
        name: '',
        email: '',
    });

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleShippingChange = (event) => {
        setShippingData({ ...shippingData, [event.target.name]: event.target.value });
    };

    const handleRecipientChange = (event) => {
        setRecipientData({ ...recipientData, [event.target.name]: event.target.value });
    };

    return (
        <>
            <Navbar />

            <Box sx={{ width: '100%' }}>
                <Stepper activeStep={activeStep}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <form>
                    {activeStep === 0 && (
                        <Box sx={{ mt: 2 }}>
                            <TextField
                                label="Address"
                                name="address"
                                value={shippingData.address}
                                onChange={handleShippingChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="City"
                                name="city"
                                value={shippingData.city}
                                onChange={handleShippingChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="ZIP Code"
                                name="zip"
                                value={shippingData.zip}
                                onChange={handleShippingChange}
                                fullWidth
                                margin="normal"
                            />
                        </Box>
                    )}
                    {activeStep === 1 && (
                        <Box sx={{ mt: 2 }}>
                            <TextField
                                label="Name"
                                name="name"
                                value={recipientData.name}
                                onChange={handleRecipientChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Email"
                                name="email"
                                value={recipientData.email}
                                onChange={handleRecipientChange}
                                fullWidth
                                margin="normal"
                            />
                        </Box>
                    )}
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            Back
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleNext}>
                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                    </Box>
                </form>
            </Box>
        </>
    )
}