import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useLocation } from "react-router-dom";
import { Item } from "../GiftRequestPage/GiftRequestPage.tsx";
import { FormControl, TextField, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import LocationSelectFormDropdown from "../../components/locationSelectFormDropdown.tsx";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

type Form = {
  name: string;
  priority: string;
  card: string;
  location: string;
  shippingType: string;
  status: string;
  itemIDs: string[];
};

function FlowerCheckoutPage() {
  useEffect(() => {
    document.title = "Flower Checkout";
  });
  const location = useLocation();
  const { cart } = location.state;

  const [data, setData] = useState({
    name: "",
    priority: "",
    card: "",
    location: "",
    shippingType: "",
    status: "",
  });

  const initialForms: Form[] = [];
  const [forms, setForms] = useState(initialForms);

  function isComplete(): boolean {
    return (
      data.name != "" &&
      data.priority != "" &&
      data.card != "" &&
      data.location != "" &&
      data.shippingType != "" &&
      data.status != ""
    );
  }

  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/gift-request");
  };

  function handleSubmit() {
    setForms([
      ...forms,
      {
        name: data.name,
        priority: data.priority,
        card: data.card,
        location: data.location,
        shippingType: data.shippingType,
        status: data.status,
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
            <Typography
              p={3}
              style={{ fontFamily: "Inria Serif" }}
              variant="h4"
              component="h1"
              align="center"
            >
              BUY FLOWERS
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
              <Box
                key={index}
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
            width: { xs: "100vw", md: "70vw" },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: { xs: "35rem", md: "40rem" },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "top",
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
                  ENTER INFORMATION
                </Typography>
              </Box>

              <FormControl
                margin="normal"
                sx={{
                  px: "1rem",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Typography>Made by Anton & Rayyan</Typography>
                </Box>

                <TextField
                  label="Name"
                  id="name-input"
                  name="name-input"
                  variant="outlined"
                  margin="normal"
                  color="primary"
                  value={data.name}
                  onChange={(e) => {
                    setData({ ...data, name: e.target.value });
                  }}
                />

                <TextField
                  required
                  select
                  id="priority-select"
                  label={"Priority"}
                  margin="normal"
                  value={data.priority}
                  onChange={(e) => {
                    setData({ ...data, priority: e.target.value });
                  }}
                >
                  <MenuItem value={"low"}>Low</MenuItem>
                  <MenuItem value={"medium"}>Medium</MenuItem>
                  <MenuItem value={"high"}>High</MenuItem>
                  <MenuItem value={"emergency"}>Emergency</MenuItem>
                </TextField>

                <TextField
                  label="Credit/Debit Card Number"
                  id="card-input"
                  name="card-input"
                  variant="outlined"
                  margin="normal"
                  color="primary"
                  fullWidth
                  value={data.card}
                  onChange={(e) => {
                    setData({ ...data, card: e.target.value });
                  }}
                />

                <LocationSelectFormDropdown
                  onChange={(v: string) => {
                    setData({ ...data, location: v });
                  }}
                  value={data.location}
                />

                <TextField
                  required
                  select
                  id={"shipping-type"}
                  label={"Shipping Type"}
                  margin="normal"
                  value={data.shippingType}
                  onChange={(e) => {
                    setData({ ...data, shippingType: e.target.value });
                  }}
                >
                  <MenuItem value={"Standard"}>Standard</MenuItem>
                  <MenuItem value={"Express"}>Express</MenuItem>
                </TextField>

                <TextField
                  required
                  select
                  id={"progress-select"}
                  label={"Status"}
                  margin="normal"
                  value={data.status}
                  onChange={(e) => {
                    setData({ ...data, status: e.target.value });
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

            <TableContainer component={Paper}>
              <Table
                sx={{
                  [`& .${tableCellClasses.root}`]: {
                    border: "none",
                  },
                }}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Name</TableCell>
                    <TableCell align="left">Priority</TableCell>
                    <TableCell align="left">Card</TableCell>
                    <TableCell align="left">Location</TableCell>
                    <TableCell align="left">Shipping Type</TableCell>
                    <TableCell align="left">Status</TableCell>
                    <TableCell align="left">Item IDs</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {forms.map((form) => (
                    <TableRow>
                      <TableCell align="left">{form.name}</TableCell>
                      <TableCell align="left">{form.priority}</TableCell>
                      <TableCell align="left">{form.card}</TableCell>
                      <TableCell align="left">{form.location}</TableCell>
                      <TableCell align="left">{form.shippingType}</TableCell>
                      <TableCell align="left">{form.status}</TableCell>
                      <TableCell align="left">{form.itemIDs}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default FlowerCheckoutPage;
