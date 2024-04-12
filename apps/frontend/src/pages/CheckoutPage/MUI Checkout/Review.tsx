import * as React from "react";

import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {Item} from "../../GiftRequestPage/GiftRequestPage.tsx";

export default function Review({data, data2, cart}) {
    return (
        <Stack spacing={2}>
            <List disablePadding>
                {/*<ListItem sx={{py: 1, px: 0}}>*/}
                {/*    <ListItemText primary="Products"/>*/}
                {/*    <Typography variant="body2">*/}
                {/*        $ {cart*/}
                {/*        .map((item: Item) => item.price)*/}
                {/*        .reduce(*/}
                {/*            (accumulator: number, currentValue: number) =>*/}
                {/*                accumulator + currentValue,*/}
                {/*            0,*/}
                {/*        )}*/}
                {/*    </Typography>*/}
                {/*</ListItem>*/}
                <ListItem sx={{py: 1, px: 0}}>
                    <ListItemText primary="Total"  secondary="Plus taxes"/>
                    <Typography variant="subtitle1" sx={{fontWeight: 700}}>
                        $ {(cart
                        .map((item: Item) => item.price)
                        .reduce(
                            (accumulator: number, currentValue: number) =>
                                accumulator + currentValue,
                            0,
                        )*1.0625).toFixed(2)}
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
                    <Typography gutterBottom>Employee Name: {data.name}</Typography>
                    <Typography color="text.secondary" gutterBottom>
                        Priority: {data.priority}
                    </Typography>
                    <Typography color="text.secondary" gutterBottom>
                        Location: {data.location}
                    </Typography>
                    <Typography color="text.secondary" gutterBottom>
                        Shipping Type: {data.shippingType}
                    </Typography>
                    <Typography color="text.secondary" gutterBottom>
                        Status: {data.status}
                    </Typography>
                </div>


                <div>
                    <Typography variant="subtitle2" gutterBottom>
                        Card details
                    </Typography>
                    <Typography gutterBottom>Card Holder Name: {data2.cardHolderName}</Typography>
                    <Typography color="text.secondary" gutterBottom>
                        Card Number: {data2.cardNumber}
                    </Typography>
                    <Typography color="text.secondary" gutterBottom>
                        CVV: {data2.cvv}
                    </Typography>
                    <Typography color="text.secondary" gutterBottom>
                        Expiration Data: {data2.expirationDate}
                    </Typography>
                </div>
            </Stack>
        </Stack>
    );
}
