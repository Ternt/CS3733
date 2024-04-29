import React, {useState} from 'react';
import {CircularProgress} from '@material-ui/core';
import {Box, Button, Typography} from "@mui/material";
import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';

export default function SpeechRecognition() {
    const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');

    recognition.continuous = true;
    recognition.lang = "en-US";
    recognition.interimResults = true;

    if (!SpeechRecognition) {
        console.error("Web Speech API not supported in this browser");
    }

    recognition.onresult = (event) => {
        setTranscript(event.results[0][0].transcript);
    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            height: '44vh',
            bgcolor: '#e4e4e4',
        }}>
            <Box sx={{
                mt: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                maxHeight: '100%',

            }}>
                <Typography variant="h6" gutterBottom> Transcript: </Typography>

                <Box sx={{
                    height: '25vh',
                    width: '75vw',
                    maxHeight: '100%',
                    maxWidth: '100%',
                    overflowY: 'scroll',
                }}>
                    <Typography variant="body1" align="center">
                        {transcript}
                    </Typography>
                </Box>
            </Box>

            {isListening ? (
                <Box display="flex" alignItems="center" justifyContent="center">
                    <CircularProgress size={24}/>
                    <Typography> Listening... </Typography>
                </Box>
            ) : (
                transcript ? (
                    <></>
                ) : (
                    <Typography variant="body1" color="textSecondary"> Click the "Start Listening" button to begin. </Typography>
                )
            )}


            <Box
                sx={{
                    width: '90%',
                    display: "flex",
                    justifyContent: "center",
                }}>
                {isListening ? (
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                            setIsListening(false);
                            recognition.stop();
                            console.log("Recording Stopped");
                        }}

                        sx={{
                            width: '20%',
                        }}

                        startIcon={<MicOffIcon/>}>

                        Stop Listening
                    </Button>
                ) : (
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                            setIsListening(true);
                            recognition.start();
                            console.log("Recording Started");
                        }}
                        startIcon={<MicIcon/>}
                        sx={{
                            mr: '3%',
                            width: '20%',
                        }}>
                        Start Listening
                    </Button>

                )}
                <Button
                    variant="contained" color="error"
                    onClick={() => {
                        setTranscript("");
                        setIsListening(false);
                        recognition.abort();
                    }}
                    sx={{
                        width: '20%',
                    }}
                >
                    Reset
                </Button>
            </Box>
        </Box>
    );
}
