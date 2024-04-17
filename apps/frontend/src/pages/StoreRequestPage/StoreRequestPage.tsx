import Box from "@mui/material/Box";
import ItemCard from "../../components/Card/ItemCard.tsx";
import Button from "@mui/material/Button";
import {useEffect, useState} from "react";
import React from "react";
import {useNavigate, useLocation} from "react-router-dom";
import Info from "../CheckoutPage/MUI Checkout/Info.tsx";
import axios, {AxiosResponse} from "axios";

export type Item = {
    id: string;
    type: string;
    imageURL: string;
    name: string;
    price: number;
    description: string;
};

function StoreRequestPage() {

    const navigate = useNavigate();
    const location = useLocation();
    const initialCart: Item[] = location.state?.cart || [];

    const pageType = (location.pathname == "/flower-request")? "FLOWER" : "GIFT";

    const [cart, setCart] = useState(initialCart);
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => { // todo fix bug that causes api to be called twice
        document.title = "Gift Request";

        axios.get<Item[]>("/api/cart-items").then((res: AxiosResponse) => {
            setItems(res.data.filter(
                (item: Item) => {
                    return item.type === pageType;
                }
            ));
        });

    }, [pageType]);

    const handleDeleteItem = (indexToRemove: number) => {
        console.log(indexToRemove);
        const newCart = cart.filter((item, index) => index !== indexToRemove);
        setCart(newCart); // This will update the state and trigger a re-render
    };

    function addItem(item: Item) {
        setCart([...cart, item]);
        console.log("added item", item.id);
    }

    const handleSubmit = () => {
        navigate("/gift-checkout", {state: {cart}});
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "flex-start",
                flexDirection: "row",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                    height: "fit-content",
                    bgcolor: "#FFFFFF",
                    width: '30vw',
                    position: "relative",
                    top: 0,
                    left: 0,
                    gap: 5,
                    overflowY: "scroll",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "flex-start",
                        p: '3vh',
                        maxWidth: '30vw',
                        marginTop: '80vh',
                        position: 'fixed',
                    }}>
                    <Box sx={{
                        marginLeft: '20%',
                        mt: '10%'
                    }}>
                        <Info cart={cart} onDeleteItem={handleDeleteItem}/>
                        <Box
                            sx={{
                                display: "flex",
                                ml: '-20%'

                            }}
                        >
                            <Button
                                type="button"
                                variant="contained"
                                color="secondary"
                                style={{minWidth: "10vw"}}
                                sx={{margin: 1}}
                                onClick={() => setCart([])}
                            >
                                Clear
                            </Button>
                             <Button
                                 variant="contained"
                                 color="primary"
                                 onClick={handleSubmit}
                                 style={{minWidth: "10vw"}}
                                 sx={{margin: 1}}
                             >
                                 Submit
                             </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box
                sx={{
                    width: {xs: "100vw", md: "70vw"},
                    backgroundColor: "#F1F1F1",
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        width: '80%',
                        m: '3vh',
                        justifyContent: 'justify-start',
                        gap: '3vh',
                        '& > *': {
                            '&:hover': {
                                transform: 'translateY(-8px)',
                            },
                        },
                    }}
                >
                    {items.map((item) => (
                        <ItemCard
                            id={item.id}
                            imageURL={item.imageURL}
                            name={item.name}
                            price={item.price}
                            description={item.description}
                            handleAdd={addItem}
                            type={item.type}
                        />
                    ))}

                </Box>
            </Box>
        </Box>

    );
}

export default StoreRequestPage;
