import * as React from "react";

import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TranslateTo from "../../../helpers/multiLanguageSupport.ts";

type ReviewProps = {
  orderDetails:{
    name: string;
    priority: string;
    location: string;
    shippingType: string;
    status: string;
  },
  cardDetails:{
    cardHolderName: string;
    cardNumber: string;
    cvv: string;
    expirationDate: string;
  },
  orderTotal:string;
}

export default function Review(props:ReviewProps) {
    return (
        <Stack spacing={2}>
            <List disablePadding>
                <ListItem sx={{py: 1, px: 0}}>
                    <ListItemText primary={TranslateTo("total")}  secondary={TranslateTo("plusTax")}/>
                    <Typography variant="subtitle1" sx={{fontWeight: 700}}>
                      $ {props.orderTotal}
                    </Typography>
                </ListItem>
            </List>
            <Divider/>
            <Stack
                direction="column"
                divider={<Divider flexItem/>}
                spacing={2}
                sx={{my: 2}}
            >
                <div>
                    <Typography variant="subtitle2" gutterBottom>
                        {TranslateTo("orderInfo")}
                    </Typography>
                    <Typography gutterBottom>Employee Name: {props.orderDetails.name}</Typography>
                    <Typography color="text.secondary" gutterBottom>
                        {TranslateTo("priority")}: {props.orderDetails.priority}
                    </Typography>
                    <Typography color="text.secondary" gutterBottom>
                        {TranslateTo("location")}: {props.orderDetails.location}
                    </Typography>
                    <Typography color="text.secondary" gutterBottom>
                        {TranslateTo("shippingType")}: {props.orderDetails.shippingType}
                    </Typography>
                    <Typography color="text.secondary" gutterBottom>
                        {TranslateTo("status")}: {props.orderDetails.status}
                    </Typography>
                </div>


                <div>
                    <Typography variant="subtitle2" gutterBottom>
                        {TranslateTo("cardD")}
                    </Typography>
                    <Typography gutterBottom>Card Holder Name: {props.cardDetails.cardHolderName}</Typography>
                    <Typography color="text.secondary" gutterBottom>
                        {TranslateTo("cardNum")}: {props.cardDetails.cardNumber}
                    </Typography>
                    <Typography color="text.secondary" gutterBottom>
                        {TranslateTo("cvv")}: {props.cardDetails.cvv}
                    </Typography>
                    <Typography color="text.secondary" gutterBottom>
                        {TranslateTo("expDate")}: {props.cardDetails.expirationDate}
                    </Typography>
                </div>
            </Stack>
        </Stack>
    );
}
