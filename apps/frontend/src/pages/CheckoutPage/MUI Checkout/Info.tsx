import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import {Item} from "../../GiftRequestPage/GiftRequestPage.tsx";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default function Info({ cart, handleDeleteItem }) {
    return (
        <>
            <Typography sx={{
                fontSize: "5vh",
                marginLeft: "-3.5vw",
                marginTop: "10vh",
                marginBottom: "3%",
            }}>
                Cart
                <ShoppingCartIcon/>
            </Typography>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "95vh",
                    position: "sticky",
                    overflowY: 'scroll',
                    width: '25vw',
                    marginLeft: "-3.5vw",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "justify-start",
                        alignItems: "top",
                        position: "absolute",
                        mt: '1vh',
                    }}
                >
                    {cart.map((item: Item, index: number) => (
                        <Card
                            key={index}
                            sx={{
                                borderRadius: "13px",
                                display: "flex",
                                flexDirection: "row",
                                m: 1,
                                boxShadow: 3,
                                width: "100%",
                                height: "12vh",
                                transition: 'transform 0.2s ease-in-out',
                                '&:hover': {
                                    backgroundColor: '#e4e4e4',
                                },
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    sx={{
                                        height: "8vh",
                                        width: "8vh",
                                        borderRadius: "13px",
                                        boxShadow: 3,
                                        marginLeft: "25%",
                                    }}
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
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        width: "95%",
                                        alignItems: "center",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <Typography
                                            style={{
                                                fontFamily: "Open Sans",
                                            }}
                                            noWrap
                                            sx={{
                                                fontWeight: 800,
                                                overflow: "visible",
                                                p: 0.5,
                                            }}
                                        >
                                            {item.name}
                                        </Typography>
                                        <Typography
                                            style={{fontFamily: "Open Sans", fontSize: "14px"}}
                                            noWrap
                                            sx={{
                                                overflow: "visible",
                                                pl: 1.2,
                                            }}
                                        >
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

                                <Box sx={{
                                    cursor: 'pointer',

                                }}>
                                    <HighlightOffIcon
                                        sx={{
                                            color: "indianred",
                                            transition: "all 0.3s ease-in-out",
                                            '&:hover': {
                                                transform: "scale(1.2)"
                                            },
                                        }}
                                        onClick={() => handleDeleteItem(index)}>
                                    </HighlightOffIcon>
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    position: "absolute",
                                    top: "105%",
                                }}
                            >

                            </Box>


                        </Card>
                    ))}
                </Box>

            </Box>
            <Typography variant="subtitle2" color="text.secondary" sx={{
                ml: '-3.5vw',
                mt: '5%',
            }}>
                Total
            </Typography>
            <Typography variant="h4" gutterBottom sx={{
                ml: '-3.5vw',
            }}>
                $
                {cart
                    .map((item: Item) => item.price)
                    .reduce(
                        (accumulator: number, currentValue: number) =>
                            accumulator + currentValue,
                        0,
                    )}
            </Typography>
        </>
    );
}
