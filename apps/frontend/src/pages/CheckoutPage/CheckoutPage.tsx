{
  /*
    import Box from "@mui/material/Box";
    import Typography from "@mui/material/Typography";
    import {useLocation} from "react-router-dom";
    import {Item} from "../GiftRequestPage/GiftRequestPage.tsx";
    import {FormControl, TextField, MenuItem} from "@mui/material";
    import {useNavigate} from "react-router-dom";
    import Button from "@mui/material/Button";
    import {useEffect, useState} from "react";
    import LocationSelectFormDropdown from "../../components/locationSelectFormDropdown.tsx";

    import React from "react";
    import Card from "@mui/material/Card";
    import CardMedia from "@mui/material/CardMedia";

    type CheckoutProps = {
        checkoutType: "flower" | "gift"; //define if checkout is for flowers or gift
        returnPath: string;
    };


    function CheckoutPage({checkoutType, returnPath}: CheckoutProps) {
        const navigate = useNavigate();

        useEffect(() => {
            document.title =
                "Checkout - " + (checkoutType === "gift" ? "Gifts" : "Flowers");
        }, [checkoutType]);

        const location = useLocation();
        const {cart} = location.state || {cart: []};

        const [data, setData] = useState({
            name: "",
            priority: "",
            card: "",
            location: "",
            shippingType: "",
            status: "",
        });

        function isComplete(): boolean {
            return Object.values(data).every((x) => x !== "");
        }

        const handleBack = () => {
            navigate(returnPath);
        };

        function handleSubmit() {
            setForms((forms) => [
                ...forms,
                {
                    ...data,
                    itemIDs: cart.map((item: Item) => item.id).join(", "),
                },
            ]);
            handleClear();
        }

        function handleClear() {
            setData({
                name: "",
                priority: "",
                card: "",
                location: "",
                shippingType: "",
                status: "",
            });
        }

        return (
            <Box
                sx={{
                    display: "flex",
                    backgroundColor: "whitesmoke"
                }}
            >


                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: {xs: "60vw", md: "60vw"},
                        height: "100vh",
                        marginX: "3vw",
                        position: "sticky",
                        top: 0,
                        left: 0,
                    }}
                >
                    <Box>
                        <Typography style={{fontFamily: "Open Sans"}} p={3} textAlign={"center"} variant={"h3"}>
                            SHOPPING CART
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "top",
                        }}
                    >
                        {cart.map((item: Item, index: number) => (
                            <Card key={index}
                                  sx={{
                                      borderRadius: "23px",
                                      display: 'flex',
                                      flexDirection: 'row',
                                      m: 1,
                                      boxShadow: 3,
                                      width: "50vw",
                                      height: "15vh"
                                  }}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignContent: "center",
                                        backgroundColor: "black"
                                    }}>

                                    <CardMedia
                                        component="img"
                                        sx={{width: "8vw", height: "8vh",}}
                                        image={item.imageURL}
                                    />

                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        flexGrow: 1,
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        px: 3,
                                    }}>
                                    <Box sx={{
                                        display: "flex",
                                        flexDirection: "column"
                                    }}>
                                        <Typography
                                            style={{
                                                fontFamily: "Open Sans",
                                            }}
                                            noWrap
                                            sx={{
                                                fontWeight: 800,
                                                overflow: "visible",
                                                p: 0.5,
                                            }}>
                                            {item.name}
                                        </Typography>
                                        <Typography
                                            style={{fontFamily: "Open Sans", fontSize: "14px"}}
                                            noWrap
                                            sx={{
                                                overflow: "visible",
                                                pl: 1.2
                                            }}>
                                            {item.description}
                                        </Typography>
                                    </Box>

                                    <Typography
                                        style={{fontFamily: "Open Sans"}}
                                        variant={"h6"}
                                        sx={{
                                            overflow: "visible",
                                            p: 1.2,
                                        }}
                                    >
                                        ${item.price}
                                    </Typography>
                                </Box>
                            </Card>
                        ))}


                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                px: 3,
                                width: "50vw",
                                height: "8vh"

                            }}
                        >
                            <Typography
                                style={{fontFamily: "Open Sans"}}
                                noWrap
                                variant={"h6"}
                                sx={{
                                    overflow: "visible",
                                    p: 1.2,
                                }}
                            >
                                Total:
                            </Typography>
                            <hr
                                style={{
                                    width: "100%",
                                }}
                            />
                            <Typography
                                style={{fontFamily: "Open Sans"}}
                                variant={"h6"}
                                sx={{
                                    overflow: "visible",
                                    p: 1.2,
                                }}
                            >
                                ${cart
                                .map((item: Item) => item.price)
                                .reduce(
                                    (accumulator: number, currentValue: number) =>
                                        accumulator + currentValue,
                                    0,
                                )}
                            </Typography>
                        </Box>


                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-around",
                                alignItems: "center",
                                pb: "20px",
                                mt: "auto",
                                p: 1.2,
                            }}
                        >
                            <Button
                                type="button"
                                variant="contained"
                                color="secondary"
                                style={{
                                    minWidth: "10vw",
                                }}
                                sx={{
                                    margin: 1,
                                }}
                                onClick={handleBack}
                            >
                                Back
                            </Button>
                        </Box>
                    </Box>
                </Box>


                <Box
                    sx={{
                        width: {xs: "35rem", md: "40rem"},
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        p: 2,
                    }}>

                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            backgroundImage: "linear-gradient(150deg,#012d5a,#003a96)",
                            boxShadow: 20,
                            borderRadius: "23px",
                            p: 2,
                        }}
                    >
                        <Box>
                            <Typography style={{fontFamily: "Open Sans"}} color={"whitesmoke"} p={1}
                                        textAlign={"center"}
                                        variant={"h3"}>
                                ENTER INFORMATION
                            </Typography>
                        </Box>

                        <FormControl
                            margin="normal"
                            sx={{
                                px: "1rem",
                            }}
                        >
                            <TextField
                                label="Name"
                                id="name-input"
                                name="name-input"
                                variant="outlined"
                                margin="normal"
                                color="primary"
                                sx={{
                                    backgroundColor: "white",
                                    borderRadius: "5px",
                                }}
                                value={data.name}
                                onChange={(e) => {
                                    setData({...data, name: e.target.value});
                                }}
                            />

                            <TextField
                                sx={{
                                    backgroundColor: "white",
                                    borderRadius: "5px",
                                }}
                                required
                                select
                                id="priority-select"
                                label={"Priority"}
                                margin="normal"
                                value={data.priority}
                                onChange={(e) => {
                                    setData({...data, priority: e.target.value});
                                }}
                            >
                                <MenuItem value={"low"}>Low</MenuItem>
                                <MenuItem value={"medium"}>Medium</MenuItem>
                                <MenuItem value={"high"}>High</MenuItem>
                                <MenuItem value={"emergency"}>Emergency</MenuItem>
                            </TextField>

                            <TextField
                                sx={{
                                    backgroundColor: "white",
                                    borderRadius: "5px",
                                }}
                                label="Credit/Debit Card Number"
                                id="card-input"
                                name="card-input"
                                variant="outlined"
                                margin="normal"
                                color="primary"
                                fullWidth
                                value={data.card}
                                onChange={(e) => {
                                    setData({...data, card: e.target.value});
                                }}
                            />

                            <LocationSelectFormDropdown
                                onChange={(v: string) => {
                                    setData({...data, location: v});
                                }}
                                value={data.location}
                            />

                            <TextField
                                sx={{
                                    backgroundColor: "white",
                                    borderRadius: "5px",
                                }}
                                required
                                select
                                id={"shipping-type"}
                                label={"Shipping Type"}
                                margin="normal"
                                value={data.shippingType}
                                onChange={(e) => {
                                    setData({...data, shippingType: e.target.value});
                                }}
                            >
                                <MenuItem value={"Standard"}>Standard</MenuItem>
                                <MenuItem value={"Express"}>Express</MenuItem>
                            </TextField>

                            <TextField
                                sx={{
                                    backgroundColor: "white",
                                    borderRadius: "5px",
                                }}
                                required
                                select
                                id={"progress-select"}
                                label={"Status"}
                                margin="normal"
                                value={data.status}
                                onChange={(e) => {
                                    setData({...data, status: e.target.value});
                                }}
                            >
                                <MenuItem value={"Unassigned"}>Unassigned</MenuItem>
                                <MenuItem value={"Assigned"}>Assigned</MenuItem>
                                <MenuItem value={"In Progress"}>In Progress</MenuItem>
                                <MenuItem value={"Closed"}>Closed</MenuItem>
                            </TextField>
                        </FormControl>

                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-around",
                                alignItems: "center",
                                pb: "20px",
                                mt: "auto",
                            }}
                        >
                            <Button
                                type="button"
                                variant="contained"
                                color="secondary"
                                style={{
                                    minWidth: "10vw",
                                }}
                                sx={{
                                    margin: 1,
                                }}
                                onClick={handleClear}
                            >
                                Clear
                            </Button>

                            <Button
                                variant="contained"
                                color="secondary"
                                style={{
                                    minWidth: "10vw",
                                }}
                                sx={{
                                    margin: 1,
                                }}
                                disabled={!isComplete()}
                                onClick={handleSubmit}
                            >
                                Submit
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        );
    }

    export default CheckoutPage;
*/
}
