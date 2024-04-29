import React, {useState} from "react";
import axios from "axios";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

export default function UploadGraphData(){
    const [nodeFile, setNodeFile] = useState<File | null>(null);
    const [edgeFile, setEdgeFile] = useState<File | null>(null);
    const [open, setOpen] = useState<boolean>(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleNodeFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNodeFile(event.target.files ? event.target.files[0] : null);
    };

    const handleEdgeFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEdgeFile(event.target.files ? event.target.files[0] : null);
    };

    async function handleSubmit(event: React.FormEvent){
        event.preventDefault();
        if (!nodeFile || !edgeFile) return;
        const formData = new FormData();
        formData.append('nodes', nodeFile);
        formData.append('edges', edgeFile);
        console.log(formData);
        await axios.post("/api/map/upload?header=true", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }

    return (
        <>
            <Box
                sx={{
                    display:'flex',
                    flexDirection:'column',
                    marginRight: 3,
                }}
            >
                <Modal
                    open={open}
                    onClose={handleClose}
                    sx={{display: 'flex', justifyContent: 'center', alignItems: 'center',}}
                >
                    <Box sx={{height: '30vh', padding: 3, borderRadius: 1, bgcolor: '#FFFFFF'}}>
                        <Typography variant={"h6"}>Upload new data</Typography>
                        <Typography variant={"subtitle1"}>Nodes</Typography>
                        <TextField
                            type="file"
                            InputProps={{
                                inputProps: {
                                    accept: ".csv",
                                },
                            }}
                            onChange={handleNodeFileChange}
                        />
                        <Typography variant={"subtitle1"}>Edges</Typography>
                        <TextField
                            type="file"
                            InputProps={{
                                inputProps: {
                                    accept: ".csv",
                                },
                            }}
                            onChange={handleEdgeFileChange}
                        />
                        <Button
                            variant="contained"
                            type="submit"
                            onClick={handleSubmit}
                        >
                            Submit
                        </Button>
                    </Box>
                </Modal>
                <Button variant="contained" onClick={handleOpen} sx={{boxShadow: 0}}>
                    Upload CSV
                </Button>
            </Box>
        </>
    );
}
