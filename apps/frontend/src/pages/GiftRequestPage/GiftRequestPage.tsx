import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import ItemCard from "../../components/Card/ItemCard.tsx";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";

export type Item = {
  id: string;
  imageURL: string;
  name: string;
  price: number;
  description: string;
};

export const StoreContext = React.createContext(null);

function GiftRequestPage() {
  const initialCart: Item[] = [];
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
          <Typography p={3} textAlign={"center"} variant={"h3"}>
            Order Flowers
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
          {Array.from(Array(25)).map((_, index) => (
            <ItemCard
              id={index.toString()}
              imageURL="../../src/assets/roses.jpg.webp"
              title={"Roses " + index}
              price="99"
              description="this is a description of roses"
              handleAdd={addItem}
            />
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default GiftRequestPage;
