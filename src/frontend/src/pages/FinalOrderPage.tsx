import Navbar from '../components/navbar/Navbar.tsx'
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useItemStore } from '../stores/ItemStore.ts'
import Address from '../models/Address.ts'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'

export default function FinalOrderPage() {
  const navigate = useNavigate()

  const itemStore = useItemStore()
  const shoppingCart = itemStore.shoppingCart

  const [orderId, setOrderId] = useState('')

  const steps = ['Adres dostawy', 'Podsumowanie', 'Wybierz metodę płatności']
  const [activeStep, setActiveStep] = useState(0)
  const [shippingData, setShippingData] = useState<Address>({
    street: '',
    building: '',
    number: '',
    city: '',
    zip: '',
  })

  const initialOptions = {
    'client-id':
      'Acyp0uL_MJHZNcwHG7nOVbPtdUEcNVg5V9Ae2KFV0q6auTXBMnd4QZOWBKNBEohCJLjK_1ZhlN5hGe6m',
    'enable-funding': 'venmo',
    'disable-funding': '',
    // "country": "PL",
    currency: 'PLN',
    'data-page-type': 'product-details',
    components: 'buttons',
    'data-sdk-integration-source': 'developer-studio',
  }

  const [message, setMessage] = useState('')

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    activeStep === 0
      ? navigate('/shopping-cart')
      : setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleShippingChange = (event: {
    target: { name: any; value: any }
  }) => {
    setShippingData({
      ...shippingData,
      [event.target.name]: event.target.value,
    })
  }

  const getTotal = () => {
    return shoppingCart.reduce(
      (total, item) => total + item.item.price * item.quantity,
      0,
    )
  }

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
                  <Box sx={{ mt: 2 }}>
                    <TextField
                      label="Ulica"
                      name="street"
                      value={shippingData.street}
                      onChange={handleShippingChange}
                      fullWidth
                      required
                      margin="normal"
                    />
                    <TextField
                      label="Numer domu"
                      name="building"
                      value={shippingData.building}
                      onChange={handleShippingChange}
                      fullWidth
                      required
                      margin="normal"
                    />
                    <TextField
                      label="Numer mieszkania"
                      name="number"
                      value={shippingData.number}
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
                      required
                      margin="normal"
                    />
                    <TextField
                      label="Kod pocztowy"
                      name="zip"
                      value={shippingData.zip}
                      onChange={handleShippingChange}
                      fullWidth
                      required
                      margin="normal"
                    />
                  </Box>
                )}
                {activeStep === 1 && (
                  <Box sx={{ my: 4 }}>
                    <Grid container>
                      <Grid item xs={12} sm={6}>
                        <Typography gutterBottom variant="h6" component="div">
                          Adres
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {shippingData.street} {shippingData.building}/
                          {shippingData.number}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {shippingData.zip} {shippingData.city}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography sx={{ my: 2 }} variant="h6" component="div">
                          Produkty
                        </Typography>
                        {shoppingCart.map((item, i) => {
                          return (
                            <Typography
                              sx={{ my: 2 }}
                              variant="body2"
                              component="div"
                            >
                              {i + 1}. {item.item.name} {item.item.price} zł -{' '}
                              {item.quantity} szt
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

                {activeStep === 2 && (
                  <Box sx={{ my: 4 }}>
                    <Grid container justifyContent="center">
                      <Grid item xs={12} className="text-center">
                        <Typography
                          variant="h6"
                          className="font-bold"
                          component="div"
                        >
                          Metoda płatności
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={8} md={8} lg={4}>
                        <div justifyContent="center">
                          <PayPalScriptProvider
                            justifyContent="center"
                            className="justify-center"
                            options={initialOptions}
                          >
                            <PayPalButtons
                              style={{
                                shape: 'pill',
                                layout: 'vertical',
                                color: 'blue',
                                label: 'paypal',
                              }}
                              createOrder={async () => {
                                try {
                                  const response = await fetch(
                                    '/api/orderapi/orders',
                                    {
                                      method: 'POST',
                                      headers: {
                                        'Content-Type': 'application/json',
                                      },
                                      body: JSON.stringify({
                                        orderPrice: getTotal(),
                                        orderId: '6673ff34c9ea904e3002d6c3',
                                      }),
                                    },
                                  )

                                  const orderData = await response.json()

                                  if (orderData.response) {
                                    setOrderId(orderData.response.id)
                                    return orderData.response.id
                                  } else {
                                    const errorDetail = orderData?.details?.[0]
                                    const errorMessage = errorDetail
                                      ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
                                      : JSON.stringify(orderData)

                                    throw new Error(errorMessage)
                                  }
                                } catch (error) {
                                  console.error(error)
                                  setMessage(
                                    `Could not initiate PayPal Checkout...${error}`,
                                  )
                                }
                              }}
                              onApprove={async (data, actions) => {
                                try {
                                  const response = await fetch(
                                    `/api/orderapi/orders/${data.orderID}/capture`,
                                    {
                                      method: 'POST',
                                      headers: {
                                        'Content-Type': 'application/json',
                                      },
                                    },
                                  )

                                  const orderData = await response.json()

                                  const errorDetail = orderData?.details?.[0]

                                  if (
                                    errorDetail?.issue === 'INSTRUMENT_DECLINED'
                                  ) {
                                    return actions.restart()
                                  } else if (errorDetail) {
                                    throw new Error(
                                      `${errorDetail.description} (${orderData.debug_id})`,
                                    )
                                  } else {
                                    const transaction =
                                      orderData.response.purchase_units[0]
                                        .payments.captures[0]
                                    setMessage(
                                      `Transaction ${transaction.status}: ${transaction.id}. See console for all available details`,
                                    )
                                    console.log(
                                      'Capture result',
                                      orderData,
                                      JSON.stringify(orderData, null, 2),
                                    )
                                  }
                                } catch (error) {
                                  console.error(error)
                                  setMessage(
                                    `Sorry, your transaction could not be processed...${error}`,
                                  )
                                }
                              }}
                            />
                          </PayPalScriptProvider>
                        </div>
                      </Grid>
                      <Grid item xs={12} className="text-center">
                        <p>{message}</p>
                      </Grid>
                    </Grid>
                  </Box>
                )}
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Powrót
                  </Button>
                  <Box sx={{ flex: '1 1 auto' }} />
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleNext}
                    disabled={
                      activeStep === 2 ||
                      !shippingData.city ||
                      !shippingData.zip ||
                      !shippingData.street ||
                      !shippingData.building
                    }
                  >
                    {activeStep === steps.length - 2 ? 'Opłać' : 'Następny'}
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
