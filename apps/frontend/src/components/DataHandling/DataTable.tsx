import React, {useMemo, useState} from "react";

import {useMediaQuery} from "@mui/system";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import {MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField} from "@mui/material";

type DataTableProps = {
    children: JSX.Element;
    headers:string[];
    rows:(string[] | string )[][];
    title:string;

};

export default function DataTable(props: DataTableProps){
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const visibleRows = useMemo(() =>
            props.rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
        [page, props.rows, rowsPerPage],
    );

    const handleChangePageE = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const matches = useMediaQuery('(min-width:1000px)');

    return (
        <>
            <Paper elevation={0} sx={{padding: 0, width: '100%'}}>
                <Toolbar variant={'dense'}
                         sx={{
                             color: '#E4E4E4',
                             borderTop: 1,
                             borderBottom: 0,
                             borderLeft: 0,
                             borderRight: 0,
                             height: '4em'
                         }}>
                    {props.children}
                </Toolbar>
                <TableContainer
                    sx={{
                        color: '#E4E4E4',
                        borderTop: 1,
                        borderBottom: 1,
                        borderLeft: 0,
                        borderRight: 0,
                        width: (!matches)?'47.38em':'100%',
                    }}>
                    <Table sx={{ minWidth: 650 }} aria-label="Edge Table">
                        <TableHead>
                            <TableRow>
                                {props.headers.map((h)=><TableCell align="left">{h}</TableCell>)}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {visibleRows.map(
                                (row, index) => {
                                    return (
                                        <TableRow
                                            key={index}
                                            sx={{
                                                "&:last-child td, &:last-child th": { border: 0 },
                                            }}
                                        >
                                            {row.map((cell)=>
                                                <TableCell align="left">{
                                                    (typeof cell === "string") ? cell : (
                                                        <TextField
                                                            required
                                                            select
                                                            value={cell[0]}
                                                            inputProps={{MenuProps: {disableScrollLock: true}}}
                                                            onChange={(event) => {
                                                                console.log(event.target.value);
                                                            }}
                                                            sx={{
                                                                marginY: 0,
                                                                width:'10rem'
                                                            }}
                                                        >
                                                            {
                                                                cell.map(c=><MenuItem value={c}>{c}</MenuItem>)
                                                            }
                                                        </TextField>
                                                    )}
                                                </TableCell>
                                            )}
                                        </TableRow>
                                    );
                                },
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box>
                    <TablePagination
                        component="div"
                        count={props.rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePageE}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Box>
            </Paper>
            <Box id={"buffer"} sx={{height: '2rem', width: '100%'}}></Box>
        </>
    );
}


