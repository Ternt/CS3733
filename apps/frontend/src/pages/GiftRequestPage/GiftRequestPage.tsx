import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import ItemCard from "../../components/Card/ItemCard.tsx";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

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
    id: "1-tedd",
    imageURL: "../../src/assets/GiftImages/TeddyBear.jpeg",
    title: "Teddy Bear",
    price: "12",
    description: "A cute Teddy Bear",
  },
  {
    id: "2-choc",
    imageURL: "../../src/assets/GiftImages/Chocolates.webp",
    title: "Chocolates",
    price: "15",
    description: "Taste good",
  },
  {
    id: "3-cake",
    imageURL: "../../src/assets/GiftImages/Cake.webp",
    title: "Cake",
    price: "40",
    description: "chocolate cake",
  },
  {
    id: "4-ps5",
    imageURL: "../../src/assets/GiftImages/PS5.webp",
    title: "PS5",
    price: "600",
    description: "ps5",
  },
];

export const StoreContext = React.createContext(null);

function GiftRequestPage() {
  useEffect(() => {
    document.title = "Gift Request";
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
    navigate("/gift-checkout", { state: { cart } });
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
          width: { xs: "60vw", md: "30vw" },
          position: "relative",
          top: 0,
          left: 0,
          gap: 5,
          overflowY: "scroll",
        }}
      >
        <Box>
          <Typography
            p={3}
            style={{ fontFamily: "Inria Serif" }}
            variant="h4"
            component="h1"
            align="center"
          >
            BUY GIFTS
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
          {cart.map((item) => (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                px: 3,
              }}
            >
              <Typography
                noWrap
                variant={"h6"}
                sx={{
                  overflow: "visible",
                  p: 1.2,
                }}
              >
                {item.name}
              </Typography>
              <hr
                style={{
                  width: "100%",
                  padding: "0 1rem",
                }}
              />
              <Typography
                variant={"h6"}
                sx={{
                  overflow: "visible",
                  p: 1.2,
                }}
              >
                {item.price}
              </Typography>
            </Box>
          ))}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            px: 3,
          }}
        >
          <Typography
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
              padding: "0 1rem",
            }}
          />
          <Typography
            variant={"h6"}
            sx={{
              overflow: "visible",
              p: 1.2,
            }}
          >
            {cart
              .map((item) => item.price)
              .reduce(
                (accumulator, currentValue) => accumulator + currentValue,
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
            onClick={() => setCart([])}
          >
            Clear
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleSubmit}
            style={{
              minWidth: "10vw",
            }}
            sx={{
              margin: 1,
            }}
          >
            Submit
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          width: { xs: "100vw", md: "70vw" },
          bgcolor: "#F1F1F1",
        }}
      >
        <Grid container>
          {items.map((item) => (
            <ItemCard
              id={item.id}
              imageURL={item.imageURL}
              title={item.title}
              price={item.price}
              description={item.description}
              handleAdd={addItem}
            />
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default GiftRequestPage;
