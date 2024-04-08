import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useLocation } from "react-router-dom";
import { Item } from "../GiftRequestPage/GiftRequestPage.tsx";
// import Button from '@mui/material/Button';

function GiftCheckoutPage() {
  const location = useLocation();
  const { cart } = location.state;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        flexDirection: "column",
      }}
    >
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
            {cart.map((item: Item) => (
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
                  .map((item: Item) => item.price)
                  .reduce(
                    (accumulator: number, currentValue: number) =>
                      accumulator + currentValue,
                    0,
                  )}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box>
          <p>test</p>
        </Box>
      </Box>
    </Box>
  );
}

export default GiftCheckoutPage;
