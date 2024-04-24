import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";


type Interpreter = {
    language: string;
    count: number;
}

type TempInterpreterFormProps = {
        name: string;
        priority: string;
        location: string;
        status: string;
        language: string;
        interpreterRemain: Interpreter[];
}

export default function TempInterpreterForm(props:TempInterpreterFormProps) {
    const formatInterpreterRemain = () => {
        return props.interpreterRemain.map(interpreter => `${interpreter.language}: ${interpreter.count}`).join("; ");
    };

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
                            <TableCell align="left">Status</TableCell>
                            <TableCell align="left">Language</TableCell>
                            <TableCell align="left">interpreterRemain</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell align="left">{props.name}</TableCell>
                            <TableCell align="left">{props.priority}</TableCell>
                            <TableCell align="left">{props.location}</TableCell>
                            <TableCell align="left">{props.status}</TableCell>
                            <TableCell align="left">{props.language}</TableCell>
                            <TableCell align="left">{formatInterpreterRemain()}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
