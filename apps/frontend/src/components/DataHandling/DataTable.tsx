import Toolbar from "@mui/material/Toolbar";
import {
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow, TextField,
  Typography
} from "@mui/material";
import React, {useMemo, useState} from "react";


type DataTableProps = {
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

  return (
    <Paper>
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        }}
      >
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {props.title}
        </Typography>
      </Toolbar>
      <TableContainer component={Paper}>
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
                            margin="dense"
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
      <TablePagination
        component="div"
        count={props.rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePageE}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}