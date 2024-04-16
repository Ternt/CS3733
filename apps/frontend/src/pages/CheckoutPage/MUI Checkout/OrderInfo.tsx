import * as React from "react";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import {styled} from "@mui/system";
import {MenuItem, TextField} from "@mui/material";
import LocationDropdown from "../../../components/LocationDropdown.tsx";

const FormGrid = styled(Grid)(() => ({
    display: "flex",
    flexDirection: "column",
}));

type OrderInfoProps = {
  orderDetails:{
    name: string;
    priority: string;
    location: string;
    shippingType: string;
    status: string;
  },
  onUpdateFormInfo: (formData:{
    name: string;
    priority: string;
    location: string;
    shippingType: string;
    status: string;
  })=>void;
}

export default function OrderInfo(props: OrderInfoProps) {
    return (
        <Grid container spacing={3}>
            <FormGrid item xs={12}>
                <FormLabel htmlFor="first-name" required>
                    Employee name
                </FormLabel>
                <TextField
                    id="name-input"
                    name="name-input"
                    variant="outlined"
                    margin="normal"
                    color="primary"
                    sx={{
                        backgroundColor: "white",
                        borderRadius: "5px",
                    }}
                    value={props.orderDetails.name}
                    onChange={(e) => {
                        props.onUpdateFormInfo({...props.orderDetails, name: e.target.value});
                    }}
                />
            </FormGrid>


            <FormGrid item xs={12}>
                <FormLabel htmlFor="last-name" required>
                    Priority
                </FormLabel>
                <TextField
                    sx={{
                        backgroundColor: "white",
                        borderRadius: "5px",
                    }}
                    required
                    select
                    id="priority-select"
                    margin="normal"
                    value={props.orderDetails.priority}
                    onChange={(e) => {
                      props.onUpdateFormInfo({...props.orderDetails, priority: e.target.value});
                    }}
                >
                    <MenuItem value={"Low"}>Low</MenuItem>
                    <MenuItem value={"Medium"}>Medium</MenuItem>
                    <MenuItem value={"High"}>High</MenuItem>
                    <MenuItem value={"Emergency"}>Emergency</MenuItem>
                </TextField>
            </FormGrid>

            <FormGrid item xs={12}>
                <FormLabel htmlFor="last-name" required>
                    Location
                </FormLabel>
                <LocationDropdown
                    label={""}
                    onChange={(v: string) => {
                      props.onUpdateFormInfo({...props.orderDetails, location: v});
                    }}
                    value={props.orderDetails.location}
                />
            </FormGrid>

            <FormGrid item xs={12}>
                <FormLabel htmlFor="last-name" required>
                    Shipping Type
                </FormLabel>
                <TextField
                    sx={{
                        backgroundColor: "white",
                        borderRadius: "5px",
                    }}
                    required
                    select
                    id={"shipping-type"}
                    margin="normal"
                    value={props.orderDetails.shippingType}
                    onChange={(e) => {
                      props.onUpdateFormInfo({...props.orderDetails, shippingType: e.target.value});
                    }}
                >
                    <MenuItem value={"Standard"}>Standard</MenuItem>
                    <MenuItem value={"Express"}>Express</MenuItem>
                </TextField>
            </FormGrid>


            <FormGrid item xs={12}>
                <FormLabel htmlFor="last-name" required>
                    Status
                </FormLabel>
                <TextField
                    sx={{
                        backgroundColor: "white",
                        borderRadius: "5px",
                    }}
                    required
                    select
                    id={"progress-select"}
                    margin="normal"
                    value={props.orderDetails.status}
                    onChange={(e) => {
                      props.onUpdateFormInfo({...props.orderDetails, status: e.target.value});
                    }}
                >
                    <MenuItem value={"Unassigned"}>Unassigned</MenuItem>
                    <MenuItem value={"Assigned"}>Assigned</MenuItem>
                    <MenuItem value={"In Progress"}>In Progress</MenuItem>
                    <MenuItem value={"Closed"}>Closed</MenuItem>
                </TextField>
            </FormGrid>

        </Grid>
    );
}
