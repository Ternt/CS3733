import * as React from "react";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import {styled} from "@mui/system";
import {MenuItem, TextField} from "@mui/material";
import LocationSelectFormDropdown from "../../../components/locationSelectFormDropdown.tsx";

const FormGrid = styled(Grid)(() => ({
    display: "flex",
    flexDirection: "column",
}));



export default function AddressForm({ data, updateData }) {
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
                    value={data.name}
                    onChange={(e) => {
                        updateData({...data, name: e.target.value});
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
                    value={data.priority}
                    onChange={(e) => {
                        updateData({...data, priority: e.target.value});
                    }}
                >
                    <MenuItem value={"low"}>Low</MenuItem>
                    <MenuItem value={"medium"}>Medium</MenuItem>
                    <MenuItem value={"high"}>High</MenuItem>
                    <MenuItem value={"emergency"}>Emergency</MenuItem>
                </TextField>
            </FormGrid>

            <FormGrid item xs={12}>
                <FormLabel htmlFor="last-name" required>
                    Location
                </FormLabel>
                <LocationSelectFormDropdown
                    onChange={(v: string) => {
                        updateData({...data, location: v});
                    }}
                    value={data.location}
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
                    value={data.shippingType}
                    onChange={(e) => {
                        updateData({...data, shippingType: e.target.value});
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
                    value={data.status}
                    onChange={(e) => {
                        updateData({...data, status: e.target.value});
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
