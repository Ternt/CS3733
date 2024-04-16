import * as React from "react";

import {
    Box,
    Button,
    Card,
    Grid,
    Stack,
    Step,
    StepLabel,
    Stepper,
    PaletteMode,
    CssBaseline,
    createTheme,
    ThemeProvider
} from "@mui/material";

import {useLocation, useNavigate} from "react-router-dom";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

import OrderInfo from "./OrderInfo.tsx";
import TempPurchaseForm from "./TempPurchaseForm.tsx";
import Info from "./Info.tsx";
import PaymentForm from "./PaymentForm.tsx";
import Review from "./Review.tsx";
import {useEffect, useState} from "react";
import {Item} from "../../StoreRequestPage/StoreRequestPage.tsx";

import axios from "axios";

const steps = ["Order Information", "Payment details", "Review your order"];


type CheckoutProps = {
    checkoutType: "flower" | "gift"; //define if checkout is for flowers or gift
    returnPath: string;
};


export default function Checkout({checkoutType, returnPath}: CheckoutProps) {

    const location = useLocation();
    const initialCart = location.state?.cart || [];
    const [cart, setCart] = useState<Item[]>(initialCart);  // Manage cart here

    const handleDeleteItem = (indexToRemove: number) => {
        const newCart = cart.filter((item, index) => index !== indexToRemove);
        setCart(newCart); // This will update the state and trigger a re-render
    };

    const navigate = useNavigate();

    useEffect(() => {
        document.title =
            "Checkout - " + (checkoutType === "gift" ? "Gifts" : "Flowers");
    }, [checkoutType]);

    const [orderData, setOrderData] = useState({
        name: "",
        priority: "",
        location: "",
        shippingType: "",
        status: "",
    });

    const [cardData, setCardData] = useState({
        cardNumber: "",
        cvv: "",
        cardHolderName: "",
        expirationDate: "",

    });


    const getStepContent = (step: number) => {
        switch (step) {
            case 0:
                return <OrderInfo orderDetails={orderData} onUpdateFormInfo={setOrderData}/>;
            case 1:
                return <PaymentForm cardDetails={cardData} onUpdateCardDetails={setCardData}/>;
            case 2:
                return <Review
                    orderDetails={orderData}
                    cardDetails={cardData}
                    orderTotal={(cart
                        .map((item: Item) => item.price)
                        .reduce(
                            (accumulator: number, currentValue: number) =>
                                accumulator + currentValue,
                            0,
                        ) * 1.0625).toFixed(2)}
                />;
            default:
                throw new Error("Unknown step");
        }
    };

    const [mode] = useState<PaletteMode>("light");
    const defaultTheme = createTheme({palette: {mode}});
    const [activeStep, setActiveStep] = useState(0);

    const handleReturnShopping = () => {
        navigate(returnPath, {state: {cart}});
    };

    const handleNext = () => {
        setActiveStep(activeStep + 1);

        console.log(activeStep);
        if(activeStep == steps.length - 1) {
            axios.post(
                "api/service-requests",
                {
                    "type": "GIFT",
                    "priority": orderData.priority,
                    "status": orderData.status,
                    "locationID": orderData.location,
                    "senderName": cardData.cardHolderName,
                    "recipientName": orderData.name,
                    "shippingType": orderData.shippingType,
                    "cardNumber": parseInt(cardData.cardNumber, 10),
                    "cardCVV": parseInt(cardData.cvv, 10),
                    "cardHolderName": cardData.cardHolderName,
                    "cardExpirationDate": cardData.expirationDate,
                    "items": cart.map((item: Item) => item.id)
                }
            );
        }
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const isComplete = (currStep: number): boolean => {
        if (currStep === 0) {
            return (
                orderData.name != "" &&
                orderData.priority != "" &&
                orderData.location != "" &&
                orderData.shippingType != "" &&
                orderData.status != ""
            );
        } else if (currStep === 1) {
            return (cardData.cardHolderName != "" &&
                cardData.cvv != "" &&
                cardData.cardNumber != "" &&
                cardData.expirationDate != "");
        } else {
            return true;
        }


    };
    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline/>
            <Grid container sx={{height: {xs: "100%", sm: "100dvh"}}}>
                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                }}>
                    <Grid
                        item
                        xs={12}
                        sm={5}
                        lg={4}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            backgroundColor: "background.paper",
                            borderRight: {sm: "none", md: "1px solid"},
                            borderColor: {sm: "none", md: "divider"},
                            alignItems: "start",
                            pt: 2,
                            px: 10,
                            gap: 4,
                            position: 'fixed',
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "end",
                                height: "7vh",
                            }}
                        >
                            <Button
                                startIcon={<ArrowBackRoundedIcon/>}
                                component="a"
                                onClick={() => handleReturnShopping()}
                                sx={{ml: "-4vw"}}
                            >
                                Continue Shopping
                            </Button>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                flexGrow: 1,
                                width: "100%",
                                maxWidth: 500,
                                marginTop: '-6vh'
                            }}
                        >
                            <Info cart={cart} onDeleteItem={handleDeleteItem}/>
                        </Box>
                    </Grid>

                    <Grid
                        item
                        sm={12}
                        md={7}
                        lg={8}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            maxWidth: "100%",
                            width: "100%",
                            backgroundColor: {xs: "transparent", sm: "background.default"},
                            alignItems: "start",
                            pt: {xs: 2, sm: 4},
                            px: {xs: 2, sm: 10},
                            gap: {xs: 4, md: 8},
                            ml: '30vw'
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: {sm: "space-between", md: "flex-end"},
                                alignItems: "center",
                                width: "100%",
                                maxWidth: {sm: "100%", md: 600},
                            }}
                        >
                            <Box
                                sx={{
                                    display: {xs: "none", md: "flex"},
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    alignItems: "flex-end",
                                    flexGrow: 1,
                                    height: "3vh",
                                }}
                            >
                                <Stepper
                                    id="desktop-stepper"
                                    activeStep={activeStep}
                                    sx={{
                                        width: "100%",
                                        height: "5vh",
                                    }}
                                >
                                    {steps.map((label) => (
                                        <Step
                                            sx={{
                                                ":first-child": {pl: 0},
                                                ":last-child": {pr: 0},
                                            }}
                                            key={label}
                                        >
                                            <StepLabel>{label}</StepLabel>
                                        </Step>
                                    ))}
                                </Stepper>
                            </Box>
                        </Box>
                        <Card
                            sx={{
                                display: {xs: "flex", md: "none"},
                                width: "100%",
                            }}
                        ></Card>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                flexGrow: 1,
                                width: "100%",
                                maxWidth: {sm: "100%", md: 600},
                                maxHeight: "720px",
                                gap: {xs: 5, md: "none"},
                            }}
                        >
                            <Stepper
                                id="mobile-stepper"
                                activeStep={activeStep}
                                alternativeLabel
                                sx={{display: {sm: "flex", md: "none"}}}
                            >
                                {steps.map((label) => (
                                    <Step
                                        sx={{
                                            ":first-child": {pl: 0},
                                            ":last-child": {pr: 0},
                                            "& .MuiStepConnector-root": {top: {xs: 6, sm: 12}},
                                        }}
                                        key={label}
                                    >
                                        <StepLabel
                                            sx={{
                                                ".MuiStepLabel-labelContainer": {maxWidth: "70px"},
                                            }}
                                        >
                                            {label}
                                        </StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                            {activeStep === steps.length ? (
                                <Stack spacing={2} useFlexGap>
                                    <TempPurchaseForm orderDetails={orderData} cardDetails={cardData}/>
                                </Stack>
                            ) : (
                                <>
                                    {getStepContent(activeStep)}
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: {xs: "column-reverse", sm: "row"},
                                            justifyContent:
                                                activeStep !== 0 ? "space-between" : "flex-end",
                                            alignItems: "end",
                                            flexGrow: 1,
                                            gap: 1,
                                            pb: {xs: 12, sm: 0},
                                            mt: {xs: 2, sm: 0},
                                            mb: "60px",
                                        }}
                                    >
                                        {activeStep !== 0 && (
                                            <Button
                                                startIcon={<ChevronLeftRoundedIcon/>}
                                                onClick={handleBack}
                                                variant="text"
                                                sx={{
                                                    display: {xs: "none", sm: "flex"},
                                                }}
                                            >
                                                Previous
                                            </Button>
                                        )}
                                        {activeStep !== 0 && (
                                            <Button
                                                startIcon={<ChevronLeftRoundedIcon/>}
                                                onClick={handleBack}
                                                variant="outlined"
                                                fullWidth
                                                sx={{
                                                    display: {xs: "flex", sm: "none"},
                                                }}
                                            >
                                                Previous
                                            </Button>
                                        )}
                                        <Button
                                            variant="contained"
                                            endIcon={<ChevronRightRoundedIcon/>}
                                            disabled={!isComplete(activeStep)}
                                            onClick={handleNext}
                                            sx={{
                                                width: {xs: "100%", sm: "fit-content"},
                                            }}
                                        >
                                            {activeStep === steps.length - 1 ? "Place order" : "Next"}
                                        </Button>
                                    </Box>
                                </>
                            )}
                        </Box>
                    </Grid>
                </Box>
            </Grid>
        </ThemeProvider>
    );
}
