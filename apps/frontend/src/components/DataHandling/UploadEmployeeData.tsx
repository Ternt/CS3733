import React, {useState} from "react";
import axios from "axios";
import Modal from "@mui/material/Modal";
import {Box, Button, TextField, Typography} from "@mui/material";
import {useMediaQuery} from "@mui/system";

export default function UploadGraphData(){
    const [employeeFile, setEmployeeFile] = useState<File | null>(null);
    const [open, setOpen] = useState<boolean>(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const matches = useMediaQuery('min-width: 300px');

    const handleNodeFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmployeeFile(event.target.files ? event.target.files[0] : null);
    };

    async function handleSubmit(event: React.FormEvent){
        event.preventDefault();
        if (!employeeFile) return;
        const formData = new FormData();
        formData.append('employees', employeeFile);

        await axios.post("/api/employees/upload", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }

    return (
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
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        padding: 3,
                        height: '15rem',
                        width: (!matches)?'30%':'300px',
                        borderRadius: 1,
                        bgcolor: '#FFFFFF',
                        minWidth: '300px',
                    }}>
                    <Typography variant={"h6"}>Upload new data</Typography>
                    <Typography variant={"subtitle1"}>Employees</Typography>
                    <TextField
                        type="file"
                        InputProps={{
                            inputProps: {
                                accept: ".csv",
                            },
                        }}
                        onChange={handleNodeFileChange}
                    />
                    <Button
                        variant="contained"
                        type="submit"
                        onClick={handleSubmit}
                    >
                        Upload
                    </Button>
                </Box>
            </Modal>
            <Button variant="contained" onClick={handleOpen} sx={{boxShadow: 0}}>
                Upload CSV
            </Button>
        </Box>
    );
}
