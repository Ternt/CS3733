import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

type TempPurchaseFormProps = {
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
}

export default function TempPurchaseForm(props:TempPurchaseFormProps) {
    return (
        <>
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
                            <TableCell align="left">Location</TableCell>
                            <TableCell align="left">Shipping Type</TableCell>
                            <TableCell align="left">Status</TableCell>
                            <TableCell align="left">cardHolderName</TableCell>
                            <TableCell align="left">cvv</TableCell>
                            <TableCell align="left">cardNumber</TableCell>
                            <TableCell align="left">expirationDate</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                            <TableRow>
                                <TableCell align="left">{props.orderDetails.name}</TableCell>
                                <TableCell align="left">{props.orderDetails.priority}</TableCell>
                                <TableCell align="left">{props.orderDetails.location}</TableCell>
                                <TableCell align="left">{props.orderDetails.shippingType}</TableCell>
                                <TableCell align="left">{props.orderDetails.status}</TableCell>
                                <TableCell align="left">{props.cardDetails.cardHolderName}</TableCell>
                                <TableCell align="left">{props.cardDetails.cvv}</TableCell>
                                <TableCell align="left">{props.cardDetails.cardNumber}</TableCell>
                                <TableCell align="left">{props.cardDetails.expirationDate}</TableCell>
                            </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
