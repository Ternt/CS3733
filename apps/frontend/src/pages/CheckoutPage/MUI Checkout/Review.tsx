import * as React from "react";

import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

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
                    <ListItemText primary="Total"  secondary="Plus taxes"/>
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
                        Order details
                    </Typography>
                    <Typography gutterBottom>Employee Name: {props.orderDetails.name}</Typography>
                    <Typography color="text.secondary" gutterBottom>
                        Priority: {props.orderDetails.priority}
                    </Typography>
                    <Typography color="text.secondary" gutterBottom>
                        Location: {props.orderDetails.location}
                    </Typography>
                    <Typography color="text.secondary" gutterBottom>
                        Shipping Type: {props.orderDetails.shippingType}
                    </Typography>
                    <Typography color="text.secondary" gutterBottom>
                        Status: {props.orderDetails.status}
                    </Typography>
                </div>


                <div>
                    <Typography variant="subtitle2" gutterBottom>
                        Card details
                    </Typography>
                    <Typography gutterBottom>Card Holder Name: {props.cardDetails.cardHolderName}</Typography>
                    <Typography color="text.secondary" gutterBottom>
                        Card Number: {props.cardDetails.cardNumber}
                    </Typography>
                    <Typography color="text.secondary" gutterBottom>
                        CVV: {props.cardDetails.cvv}
                    </Typography>
                    <Typography color="text.secondary" gutterBottom>
                        Expiration Data: {props.cardDetails.expirationDate}
                    </Typography>
                </div>
            </Stack>
        </Stack>
    );
}
