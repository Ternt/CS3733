import React, { useEffect, useMemo, useState } from "react";
import axios, { AxiosResponse } from "axios";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";

type node = {
  nodeID: string;
  xcoord: number;
  ycoord: number;
  floor: string;
  building: string;
  nodeType: string;
  longName: string;
  shortName: string;
};

type edge = {
  startNodeID: string;
  endNodeID: string;
  blocked: boolean;
};

const MapDataDisplay: React.FC = () => {
  const [nodeTable, setNodeTable] = useState<node[]>([]);
  const [edgeTable, setEdgeTable] = useState<edge[]>([]);
  const [pageN, setPageN] = useState(0);
  const [pageE, setPageE] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePageN = (event: unknown, newPage: number) => {
    setPageN(newPage);
  };
  const handleChangePageE = (event: unknown, newPage: number) => {
    setPageE(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPageN(0);
    setPageE(0);
  };

  const visibleRowsN = useMemo(
    () =>
      nodeTable.slice(pageN * rowsPerPage, pageN * rowsPerPage + rowsPerPage),
    [nodeTable, pageN, rowsPerPage],
  );

  const visibleRowsE = useMemo(
    () =>
      edgeTable.slice(pageE * rowsPerPage, pageE * rowsPerPage + rowsPerPage),
    [edgeTable, pageE, rowsPerPage],
  );

  useEffect(() => {
    axios.get<[]>("/api/map").then((response: AxiosResponse) => {
      setNodeTable(response.data.nodes);
      setEdgeTable(response.data.edges);
    });
  }, []);

  return (
    <Box
      sx={{
        m: 4,
      }}
    >
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
            Nodes
          </Typography>
        </Toolbar>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="Node Table">
            <TableHead>
              <TableRow>
                <TableCell align="left">NodeID</TableCell>
                <TableCell align="left">xCoord</TableCell>
                <TableCell align="left">yCoord</TableCell>
                <TableCell align="left">floor</TableCell>
                <TableCell align="left">building</TableCell>
                <TableCell align="left">type</TableCell>
                <TableCell align="left">longName</TableCell>
                <TableCell align="left">shortName</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleRowsN.map(
                (request: {
                  nodeID: string;
                  xcoord: number;
                  ycoord: number;
                  floor: string;
                  building: string;
                  nodeType: string;
                  longName: string;
                  shortName: string;
                }) => {
                  return (
                    <TableRow
                      key={request.nodeID}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {request.nodeID}
                      </TableCell>
                      <TableCell align="left">{request.xcoord}</TableCell>
                      <TableCell align="left">{request.ycoord}</TableCell>
                      <TableCell align="left">{request.floor}</TableCell>
                      <TableCell align="left">{request.building}</TableCell>
                      <TableCell align="left">{request.nodeType}</TableCell>
                      <TableCell align="left">{request.longName}</TableCell>
                      <TableCell align="left">{request.shortName}</TableCell>
                    </TableRow>
                  );
                },
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={nodeTable.length}
          rowsPerPage={rowsPerPage}
          page={pageN}
          onPageChange={handleChangePageN}
        />
      </Paper>
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
            Edges
          </Typography>
        </Toolbar>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="Edge Table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Index</TableCell>
                <TableCell align="left">Start Node</TableCell>
                <TableCell align="left">End Node</TableCell>
                <TableCell align="left">Blocked</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleRowsE.map(
                (
                  request: {
                    startNodeID: string;
                    endNodeID: string;
                    blocked: boolean;
                  },
                  index,
                ) => {
                  return (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        Edge {index}
                      </TableCell>
                      <TableCell align="left">{request.startNodeID}</TableCell>
                      <TableCell align="left">{request.endNodeID}</TableCell>
                      <TableCell align="left">
                        {request.blocked.toString()}
                      </TableCell>
                    </TableRow>
                  );
                },
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={edgeTable.length}
          rowsPerPage={rowsPerPage}
          page={pageE}
          onPageChange={handleChangePageE}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default MapDataDisplay;
