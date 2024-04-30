import * as React from "react";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import {styled} from "@mui/system";
import {MenuItem, TextField} from "@mui/material";
import LocationDropdown from "../../../components/LocationDropdown.tsx";
import TranslateTo from "../../../helpers/multiLanguageSupport.ts";

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
                    {TranslateTo("employeeN")}
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
                    {TranslateTo("priority")}
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
                    <MenuItem value={"LOW"}>{TranslateTo("priority.low")}</MenuItem>
                    <MenuItem value={"MEDIUM"}>{TranslateTo("priority.med")}</MenuItem>
                    <MenuItem value={"HIGH"}>{TranslateTo("priority.high")}</MenuItem>
                    <MenuItem value={"EMERGENCY"}>{TranslateTo("priority.emergency")}</MenuItem>
                </TextField>
            </FormGrid>

            <FormGrid item xs={12}>
                <FormLabel htmlFor="last-name" required>
                    {TranslateTo("location")}
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
                    {TranslateTo("cart.ShipT")}
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
                    <MenuItem value={"Standard"}>{TranslateTo("standard")}</MenuItem>
                    <MenuItem value={"Express"}>{TranslateTo("express")}</MenuItem>
                </TextField>
            </FormGrid>


            <FormGrid item xs={12}>
                <FormLabel htmlFor="last-name" required>
                    {TranslateTo("status")}
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
                    <MenuItem value={"UNASSIGNED"}>{TranslateTo("status.un")}</MenuItem>
                    <MenuItem value={"ASSIGNED"}>{TranslateTo("status.as")}</MenuItem>
                    <MenuItem value={"IN_PROGRESS"}>{TranslateTo("status.in")}</MenuItem>
                    <MenuItem value={"CLOSED"}>{TranslateTo("status.cl")}</MenuItem>
                </TextField>
            </FormGrid>

        </Grid>
    );
}
