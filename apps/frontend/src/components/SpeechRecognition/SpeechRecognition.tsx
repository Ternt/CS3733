import React, {useState} from 'react';
import {CircularProgress} from '@material-ui/core';
import {Box, Button, Typography} from "@mui/material";
import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';

type SpeechRecognitionProps = {
    language: string;
    onSetTranscript: (transcript: string | null) => void;
    transcript: string | null;
};


export default function SpeechRecognition(props: SpeechRecognitionProps) {
    const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();
    const [isListening, setIsListening] = useState(false);

    recognition.continuous = true;
    recognition.lang = props.language;
    recognition.interimResults = true;

    if (!SpeechRecognition) {
        console.error("Web Speech API not supported in this browser");
    }


    recognition.onresult = (event) => {
        props.onSetTranscript(event.results[0][0].transcript);
    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            bgcolor: '#e4e4e4',
        }}>
            <Box sx={{
                pt: '1rem',
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                maxHeight: '100%',

            }}>
                <Typography variant="h6" gutterBottom> Transcript: </Typography>

                <Box sx={{
                    height: '30vh',
                    width: '75vw',
                    maxHeight: '100%',
                    maxWidth: '100%',
                    overflowY: 'scroll',
                }}>
                    <Typography variant="body1" align="center">
                        {isListening ? (
                            <Box display="flex" alignItems="center" justifyContent="center">
                                <CircularProgress size={24}/>
                                <Typography> Listening... </Typography>
                            </Box>
                        ) : (
                            props.transcript ? (
                                <></>
                            ) : (
                                <Typography variant="body1" color="textSecondary"> Select a Language then Click the "Start Listening" button to
                                    begin. </Typography>
                            )
                        )}
                        {props.transcript}
                    </Typography>
                </Box>
            </Box>


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
                            mr: '3%',
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
                        props.onSetTranscript("");
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
