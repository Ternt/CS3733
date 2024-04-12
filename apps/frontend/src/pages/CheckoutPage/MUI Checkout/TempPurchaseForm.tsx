import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
export default function TempPurchaseForm({data, data2}) {
    return (
        <React.Fragment>
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
                                <TableCell align="left">{data.name}</TableCell>
                                <TableCell align="left">{data.priority}</TableCell>
                                <TableCell align="left">{data.location}</TableCell>
                                <TableCell align="left">{data.shippingType}</TableCell>
                                <TableCell align="left">{data.status}</TableCell>
                                <TableCell align="left">{data2.cardHolderName}</TableCell>
                                <TableCell align="left">{data2.cvv}</TableCell>
                                <TableCell align="left">{data2.cardNumber}</TableCell>
                                <TableCell align="left">{data2.expirationDate}</TableCell>
                            </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>
    );
}
