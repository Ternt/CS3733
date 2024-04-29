import Box from "@mui/material/Box";
import * as React from "react";
//import Tabs from "@mui/material/Tabs";
//import Tab from "@mui/material/Tab";
import {
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl, IconButton, Snackbar,
    TextField,
    Typography
} from "@mui/material";
import {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import {edge, node} from "../../helpers/typestuff.ts";
import CloseIcon from "@mui/icons-material/Close";
import {FLOOR_OFFSETS} from "../../helpers/MapHelper.ts";

type InfoMenuProp = {
    nodeData: node | null;
    onClose: () => void;
    onChangeNode: (node: node | null) => void;
    onPulseUpdate: () => void;
    edges: edge[];
    nodes: node[];
};

export default function NodeInformationMenu(props: InfoMenuProp) {
    const [newNodeData, setNewNodeData] = useState<node | null>(props.nodeData);
    const [addingNeighbor, setAddingNeighor] = useState<string | null>(null);
    const [notification, setNotification] = useState('');
    const [stagedEdges, setStagedEdges] = useState<edge[]>([]);
    useEffect(() => {
        setNewNodeData(props.nodeData);
    }, [props.nodeData]);

    const adminCardStyleBody = {
        fontFamily: "Open Sans",
        fontSize: "15",
        backgroundColor: "#f1f1f1",
        borderRadius: "5px",
        color: "#2f2f2f",
        width: "100%",
    };
    if (newNodeData === null) {
        return <></>;
    }

    function isComplete(): boolean {
        return (
            newNodeData?.nodeID != "" &&
            newNodeData?.point.x != null &&
            newNodeData?.point.y != null &&
            newNodeData.floor != "" &&
            newNodeData.building != "" &&
            newNodeData.longName != "" &&
            newNodeData.shortName != "" &&
            newNodeData.nodeType != ""
        );
    }

    async function submitForm() {

        if (isComplete() && newNodeData !== null) {
            const editedNode = {
                nodeID: newNodeData.nodeID,
                xcoord: Math.round(newNodeData.point.x - FLOOR_OFFSETS[newNodeData.point.z].x),
                ycoord: Math.round(newNodeData.point.y - FLOOR_OFFSETS[newNodeData.point.z].y),
                floor: newNodeData.floor,
                building: newNodeData.building,
                longName: newNodeData.longName,
                shortName: newNodeData.shortName,
                nodeType: newNodeData.nodeType
            };
            props.onChangeNode(newNodeData);

            // Send a PUT request to the server
            await fetch("/api/nodes/update", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(editedNode),
            });

            for (const edge of stagedEdges) {
                await fetch("/api/edges/update", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        startNodeID: edge.startNode.nodeID,
                        endNodeID: edge.endNode.nodeID,
                        blocked: edge.blocked,
                        heat: edge.heat,
                    }),
                });
            }

            setStagedEdges([]); // clear after submitting

            props.onPulseUpdate();
        }
    }

    async function deleteNode() {
        for (const ed of props.edges) {
            if (ed.startNode.nodeID === props.nodeData?.nodeID || ed.endNode.nodeID === props.nodeData?.nodeID)
                await deleteEdge(ed);
        }
        await fetch("/api/nodes/delete?nodeID=" + props.nodeData?.nodeID, {
            method: "DELETE",
        });
        props.onPulseUpdate();
        props.onClose();
    }

    async function deleteEdge(e: edge) {
        await fetch("/api/edges/delete?startNodeID=" + e.startNode.nodeID + "&endNodeID=" + e.endNode.nodeID, {
            method: "DELETE",
        });
    }

    // toggles the edge's blocked value (on click)
    // if edge is already in stagedEdges, just flip value
    // else push the edge and flip
    function toggleEdge(edge: edge) {
        const index = stagedEdges.findIndex(e => e.startNode.nodeID === edge.startNode.nodeID && e.endNode.nodeID === edge.endNode.nodeID);

        if (index >= 0) {
            const updatedEdge = stagedEdges.map((e, idx) => idx === index ? {...e, blocked: !e.blocked} : e);
            setStagedEdges(updatedEdge);
        } else setStagedEdges([...stagedEdges, {...edge, blocked: !edge.blocked}]);
    }


    async function addNeighbor() {
        if (addingNeighbor === null || addingNeighbor === props.nodeData?.nodeID)
            return;
        for (const n of props.nodes) {
            if (n.nodeID === addingNeighbor) {
                const editedEdge = {
                    startNodeID: n.nodeID,
                    endNodeID: props.nodeData?.nodeID,
                    blocked: false,
                    heat: 100
                };

                // Send a PUT request to the server
                await fetch("/api/edges/update", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(editedEdge),
                });
                setNotification("Connected " + n.nodeID + " & " + props.nodeData?.nodeID);
                setAddingNeighor(null);
                props.onPulseUpdate();
                return;
            }
        }
        setNotification("Couldn't find node with id " + addingNeighbor);
        setAddingNeighor(null);
    }

    return (
        <Box
            sx={{
                width: "400px",
                display: "flex",
                justifyContent: "flex-start",
                flexDirection: "column",
                position: "fixed",
                top: "11vh",
                left: "120px",
                bgcolor: "transparent",
            }}
        >
            <FormControl
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    bgcolor: 'transparent'
                }}
            >
                <Box
                    sx={{
                        mt: '2rem',
                        height: '2.5rem',
                        bgcolor: 'white',
                        boxShadow: 5,
                    }}
                >
                    <Button
                        sx={{
                            fontSize: '1.5rem',
                            width: '100%',
                            height: '100%',
                        }}
                        onClick={() => {
                            props.onClose();
                        }}
                    >
                        &lt;
                    </Button>
                </Box>
                <Box
                    sx={{
                        padding: 2,
                        display: "flex",
                        justifyContent: "flex-start",
                        flexDirection: "column",
                        height: '88vh',
                        boxShadow: 5,
                        gap: 2,
                        bgcolor: 'white'
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: 'row',
                            gap: 1,
                        }}
                    >
                        <TextField
                            label={"Node ID"}
                            value={newNodeData.nodeID}
                            sx={adminCardStyleBody}
                            onChange={(e) => {
                                setNewNodeData({...newNodeData, nodeID: e.target.value});
                            }}
                        />
                        <TextField
                            label={"Floor"}
                            value={
                                newNodeData.floor
                            }
                            sx={adminCardStyleBody}
                            onChange={(e) => {
                                setNewNodeData({...newNodeData, floor: e.target.value});
                            }}
                        />
                    </Box>
                    <TextField
                        label={"Short Name"}
                        value={
                            newNodeData.shortName
                        }
                        sx={adminCardStyleBody}
                        onChange={(e) => {
                            setNewNodeData({...newNodeData, shortName: e.target.value});
                        }}
                    />
                    <TextField
                        label={"Long Name"}
                        value={
                            newNodeData.longName
                        }
                        sx={adminCardStyleBody}
                        onChange={(e) => {
                            setNewNodeData({...newNodeData, longName: e.target.value});
                        }}
                    />
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: 'row',
                            gap: 1
                        }}
                    >
                        <TextField
                            label={"Building"}
                            value={
                                newNodeData.building
                            }
                            sx={adminCardStyleBody}
                            onChange={(e) => {
                                setNewNodeData({...newNodeData, building: e.target.value});
                            }}
                        />
                        <TextField
                            label={"Node Type"}
                            value={
                                newNodeData.nodeType
                            }
                            sx={adminCardStyleBody}
                            onChange={(e) => {
                                setNewNodeData({...newNodeData, nodeType: e.target.value});
                            }}
                        />
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: 'row',
                            gap: 1
                        }}
                    >
                        <TextField
                            label={"X"}
                            value={
                                Math.round(newNodeData.point.x)
                            }
                            sx={adminCardStyleBody}
                            onChange={(e) => {
                                setNewNodeData({
                                    ...newNodeData,
                                    point: {
                                        x: Math.round(parseFloat(e.target.value)),
                                        y: newNodeData?.point.y,
                                        z: newNodeData?.point.z,
                                    },
                                });
                            }}
                        />
                        <TextField
                            label={"Y"}
                            value={
                                Math.round(newNodeData.point.y)
                            }
                            sx={adminCardStyleBody}
                            onChange={(e) => {
                                setNewNodeData({
                                    ...newNodeData,
                                    point: {
                                        y: Math.round(parseFloat(e.target.value)),
                                        x: newNodeData?.point.x,
                                        z: newNodeData?.point.z,
                                    },
                                });
                            }}
                        />
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 1
                        }}
                    >
                        <Typography variant={'caption'} sx={{display: 'block', width: '100%'}}>
                            Connected to:
                        </Typography>
                        {
                            // filter all edges that have this as a node, display the other node as the neighbors
                            // add neighbor button that brings up a text popup to add the selection
                            props.edges.filter((x) => {
                                if (props.nodeData === null) return false;
                                if (x.startNode.nodeID === props.nodeData?.nodeID || x.endNode.nodeID === props.nodeData?.nodeID) return true;
                            }).map((x) => {
                                const stagedEdge = stagedEdges.find(se => se.startNode.nodeID === x.startNode.nodeID && se.endNode.nodeID === x.endNode.nodeID);
                                const isBlocked = stagedEdge ? stagedEdge.blocked : x.blocked;

                                return (<Chip label={
                                    (x.endNode.nodeID === props.nodeData?.nodeID) ?
                                        x.startNode.nodeID :
                                        (x.startNode.nodeID === props.nodeData?.nodeID) ?
                                            x.endNode.nodeID :
                                            "NONE"
                                } variant="outlined" onDelete={async () => {
                                    await deleteEdge(x);
                                    props.onPulseUpdate();
                                }}
                                              sx={{
                                                  bgcolor: (
                                                      isBlocked
                                                  ) ? '#fff391' : 'default',
                                              }}
                                              onClick={() => toggleEdge(x)}
                                              key={x.startNode.nodeID + " " + x.endNode.nodeID}
                                />);
                            })
                        }
                        <Chip label={"+"} variant="outlined" onClick={() => {
                            setAddingNeighor('');
                        }}/>
                        <Typography variant={'caption'} sx={{display: 'block', width: '100%'}}>
                            *Blocked edges are marked with yellow
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                            gap: 1,
                            width: '100%',
                        }}
                    >
                        <Button
                            type="button"
                            variant="outlined"
                            color="secondary"
                            onClick={deleteNode}
                        >
                            Delete Node
                        </Button>
                        <Button
                            type="button"
                            variant="contained"
                            color="secondary"
                            onClick={submitForm}
                        >
                            Save Node
                        </Button>
                    </Box>
                </Box>
            </FormControl>
            <Dialog
                open={addingNeighbor !== null}
                onClose={() => {
                    setAddingNeighor(null);
                }}
            >
                <DialogTitle>Add Neighbor</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="nodeid"
                        name="nodeid"
                        label="Node ID"
                        fullWidth
                        variant="standard"
                        value={addingNeighbor}
                        onChange={(e) => {
                            setAddingNeighor(e.target.value);
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        setAddingNeighor(null);
                    }}>Cancel</Button>
                    <Button onClick={addNeighbor}>Add</Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                open={notification !== ''}
                onClose={() => {
                    setNotification('');
                }}
                autoHideDuration={5000}
                message={notification}
                key={"Notif"}
                action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        sx={{p: 0.5}}
                        onClick={() => {
                            setNotification('');
                        }}
                    >
                        <CloseIcon/>
                    </IconButton>
                }
            />
        </Box>
    );
}
