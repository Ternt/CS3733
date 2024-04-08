import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import ItemCard from "../../components/Card/ItemCard.tsx";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useState } from "react";

export type Item = {
  id: string;
  imageURL: string;
  name: string;
  price: number;
  description: string;
};

function GiftRequestPage() {
  const initialCart: Item[] = [];
  const [cart, setCart] = useState(initialCart);

  function addItem(item: Item) {
    setCart([...cart, item]);
    console.log("added item", item.id);
  }

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
          bgcolor: "#FFFFFF",
          width: { xs: "60vw", md: "30vw" },
          height: "100vh",
          position: "sticky",
          top: 0,
          left: 0,
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
                px: 3,
              }}
            >
              <Typography variant={"h6"}>{item.name}</Typography>
              <Typography variant={"h6"}>{item.price}</Typography>
            </Box>
          ))}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: "20px",
            marginTop: "auto",
          }}
        >
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            style={{
              minWidth: "10vw",
            }}
            sx={{
              margin: 1,
            }}
          >
            Submit
          </Button>
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
          >
            Clear
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
