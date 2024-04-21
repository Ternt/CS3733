import * as Papa from "papaparse";
import React, { useEffect, useMemo, useState } from "react";
import axios, { AxiosResponse } from "axios";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
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

export function UploadButton() {
  return (
    <Button variant="contained" color="primary" component="span">
      Upload
    </Button>
  );
}

export function UploadForm() {
  return (
    <form>
      <TextField type="file" />
      <Button variant="contained" color="primary" component="span">
        Upload
      </Button>
    </form>
  );
}

const InputCSV: React.FC = () => {
  const [nodeFile, setNodeFile] = useState<File | null>(null);
  const [edgeFile, setEdgeFile] = useState<File | null>(null);

  interface NodeRow {
    nodeID: string;
    xcoord: string;
    ycoord: string;
    floor: string;
    building: string;
    nodeType: string;
    longName: string;
    shortName: string;
  }

  interface EdgeRow {
    startNode: string;
    endNode: string;
    blocked: string;
    heat: string;
  }

  const handleNodeFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNodeFile(event.target.files ? event.target.files[0] : null);
  };

  const handleEdgeFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEdgeFile(event.target.files ? event.target.files[0] : null);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (nodeFile && edgeFile) {
      Papa.parse<NodeRow>(nodeFile, {
        header: true,
        complete: async (results) => {
          const nodes = results.data.map((row: NodeRow) => ({
            nodeID: row.nodeID,
            xcoord: row.xcoord,
            ycoord: row.ycoord,
            floor: row.floor,
            building: row.building,
            nodeType: row.nodeType,
            longName: row.longName,
            shortName: row.shortName,
          }));

          Papa.parse<EdgeRow>(edgeFile, {
            header: true,
            complete: async (results) => {
              const edges = results.data.map((row: EdgeRow) => ({
                startNode: row.startNode,
                endNode: row.endNode,
                blocked: row.blocked,
                heat: row.heat,
              }));

              try {
                for (const node of nodes) {
                  const response = await axios.put("/api/update/", node, {
                    headers: {
                      "Content-Type": "application/json",
                    },
                  });
                  console.log(response.data);
                }

                for (const edge of edges) {
                  const response = await axios.put("/api/update/", edge, {
                    headers: {
                      "Content-Type": "application/json",
                    },
                  });
                  console.log(response.data);
                }
              } catch (error) {
                if (axios.isAxiosError(error)) {
                  if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                  } else if (error.request) {
                    console.log(error.request);
                  } else {
                    console.log("Error", error.message);
                  }
                  console.log(error.config);
                } else {
                  console.log("Error", error);
                }
              }
            },
          });
        },
      });
    } else {
      console.log("Both files are required");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        type="file"
        InputProps={{
          inputProps: {
            accept: ".csv",
          },
        }}
        onChange={handleNodeFileChange}
      />
      <TextField
        type="file"
        InputProps={{
          inputProps: {
            accept: ".csv",
          },
        }}
        onChange={handleEdgeFileChange}
      />
      <Button variant="contained" color="primary" type="submit">
        Upload
      </Button>
    </form>
  );
};

const handleDownload = async (downloadUrl: string, filename: string) => {
  try {
    const response = await axios.get(downloadUrl, { responseType: "blob" });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error("Error downloading file", error);
  }
};

const DownloadCSV: React.FC = () => {
  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleDownload("/api/nodes/download", "nodes.csv")}
      >
        Download Nodes CSV
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleDownload("/api/edges/download", "edges.csv")}
      >
        Download Edges CSV
      </Button>
    </div>
  );
};

const MapDataDisplay: React.FC = () => {
  const [nodeTable, setNodeTable] = useState<node[]>([]);
  const [edgeTable, setEdgeTable] = useState<edge[]>([]);
  const [pageN, setPageN] = useState(0);
  const [pageE, setPageE] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [tab, setTab] = useState(0);
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
      <DownloadCSV />

      <Box
        sx={{
          height: "10vh",
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "flex-start",
          gap: 1,
        }}
      >
        {["Nodes", "Edges"].map((v, i) => (
          <Box
            onClick={() => {
              setTab(i);
            }}
            sx={{
              height: "90%",
              p: 3,
              border: "1px solid black",
              borderBottom: "none",
              bgcolor: tab === i ? "#fff" : "#eee",
              boxShadow: tab === i ? 5 : 0,
              mb: tab === i ? -1 : 0,
              "&:hover": {
                bgcolor: "#fff",
              },
            }}
            key={i}
          >
            {v}
          </Box>
        ))}
      </Box>

      {tab === 0 && (
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
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
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
      )}
      {tab === 1 && (
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
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          Edge {index}
                        </TableCell>
                        <TableCell align="left">
                          {request.startNodeID}
                        </TableCell>
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
      )}
      <InputCSV />
    </Box>
  );
};

export default MapDataDisplay;
