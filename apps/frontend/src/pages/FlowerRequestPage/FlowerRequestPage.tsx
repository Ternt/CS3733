import Box from "@mui/material/Box";
import ItemCard from "../../components/Card/ItemCard.tsx";
import Button from "@mui/material/Button";
import {useEffect, useState} from "react";
import React from "react";
import {useNavigate, useLocation} from "react-router-dom";
import Info from '../CheckoutPage/MUI Checkout/Info.tsx';

export type Item = {
  id: string;
  imageURL: string;
  name: string;
  price: number;
  description: string;
};

type ItemCardData = {
  id: string;
  imageURL: string;
  title: string;
  price: string;
  description: string;
};

const items: ItemCardData[] = [
  {
    id: "1-rose",
    imageURL: "https://cdn.nodenium.com/37eed916-975b-4788-a5a4-b8ff64490f04",
    title: "Rose",
    price: "20",
    description: "",
  },
  {
    id: "2-dais",
    imageURL: "https://cdn.nodenium.com/d5074553-86a1-4351-93a0-f720b503dada",
    title: "Daisy",
    price: "30",
    description: "",
  },
  {
    id: "3-tuli",
    imageURL: "https://cdn.nodenium.com/38afd65e-4f26-46c8-b853-66cf863b975d",
    title: "Tilp",
    price: "35",
    description: "",
  },
  {
    id: "4-forg",
    imageURL: "https://cdn.nodenium.com/a7aa8e0a-c057-46ee-b99b-212908aebe73",
    title: "Forget-Me-Not",
    price: "12",
    description: "",
  },
];

export const StoreContext = React.createContext(null);

function FlowerRequestPage() {
    useEffect(() => {
        document.title = "Flower Request";
    });

    const location = useLocation();
    const initialCart: Item[] = location.state?.cart || [];

    const [cart, setCart] = useState(initialCart);

    function addItem(item: Item) {
        setCart([...cart, item]);
        console.log("added item", item.id);
    }

    const navigate = useNavigate();
    const handleSubmit = () => {
        navigate("/flower-checkout", {state: {cart}});
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
                    width: '40vw',
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
                        justifyContent: "space-around",
                        m: '3vh',
                        marginLeft: '0vw'
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
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "flex-start",
                        p: '3vh',
                        maxWidth: '30vw',
                        marginTop: '-8vh'
                    }}>
                    <Box sx={{
                        marginLeft: '20%'
                    }}>
                        <Info cart={cart} handleDeleteItem={""}/>
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
                            key={item.id}
                            id={item.id}
                            imageURL={item.imageURL}
                            title={item.title}
                            price={item.price}
                            description={item.description}
                            handleAdd={addItem}
                        />
                    ))}
                </Box>
            </Box>
        </Box>
    );
}

export default FlowerRequestPage;
