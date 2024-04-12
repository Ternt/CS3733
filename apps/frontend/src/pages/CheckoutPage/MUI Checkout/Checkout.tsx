import * as React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import {useLocation, useNavigate} from "react-router-dom";

import {createTheme, ThemeProvider} from "@mui/material/styles";
import {PaletteMode} from "@mui/material";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

import OrderInfo from "./OrderInfo.tsx";
import TempPurchaseForm from "./TempPurchaseForm.tsx";
import Info from "./Info.tsx";
import PaymentForm from "./PaymentForm.tsx";
import Review from "./Review.tsx";
import {useEffect, useState} from "react";

const steps = ["Order Information", "Payment details", "Review your order"];


type CheckoutProps = {
    checkoutType: "flower" | "gift"; //define if checkout is for flowers or gift
    returnPath: string;
};


export default function Checkout({checkoutType, returnPath}: CheckoutProps) {

    const location = useLocation();
    const initialCart = location.state?.cart || [];
    const [cart, setCart] = useState(initialCart);  // Manage cart here

    const handleDeleteItem = (indexToRemove: number) => {
        const newCart = cart.filter((item, index) => index !== indexToRemove);
        setCart(newCart); // This will update the state and trigger a re-render
    };

    const navigate = useNavigate();

    useEffect(() => {
        document.title =
            "Checkout - " + (checkoutType === "gift" ? "Gifts" : "Flowers");
    }, [checkoutType]);

    const [formData, setFormData] = useState({
        name: "",
        priority: "",
        card: "",
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


    const updateFormData = (newData) => {
        setFormData(newData);
    };

    const updateCardData = (newData) => {
        setCardData(newData);
    };

    const getStepContent = (step: number) => {
        switch (step) {
            case 0:
                return <OrderInfo formInfo={formData} updateFormInfo={updateFormData}/>;
            case 1:
                return <PaymentForm cardInfo={cardData} updateCardInfo={updateCardData}/>;
            case 2:
                return <Review data={formData} data2={cardData} cart={cart}/>;
            default:
                throw new Error("Unknown step");
        }
    };

    const [mode] = React.useState<PaletteMode>("light");
    const defaultTheme = createTheme({palette: {mode}});
    const [activeStep, setActiveStep] = React.useState(0);

    const handleReturnShopping = () => {
        navigate(returnPath, {state: {cart}});
    };

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const isComplete = (currStep: number): boolean => {
        if (currStep === 0) {
            return (
                formData.name != "" &&
                formData.priority != "" &&
                formData.location != "" &&
                formData.shippingType != "" &&
                formData.status != ""
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
                <Grid
                    item
                    xs={12}
                    sm={5}
                    lg={4}
                    sx={{
                        display: {xs: "none", md: "flex"},
                        flexDirection: "column",
                        backgroundColor: "background.paper",
                        borderRight: {sm: "none", md: "1px solid"},
                        borderColor: {sm: "none", md: "divider"},
                        alignItems: "start",
                        pt: 4,
                        px: 10,
                        gap: 4,
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
                        }}
                    >
                        <Info cart={cart} handleDeleteItem={handleDeleteItem}/>
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
                                <TempPurchaseForm data={formData} data2={cardData}/>
                            </Stack>
                        ) : (
                            <React.Fragment>
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
                            </React.Fragment>
                        )}
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
