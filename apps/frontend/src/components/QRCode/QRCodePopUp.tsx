import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import Box from "@mui/material/Box";
import QRCode from "qrcode";

type QRCodePopUpProp = {
    startNode: string;
    endNode: string;
    algo: number;
};

export default function QRCodePopUp(props: QRCodePopUpProp) {
    const [showQRCode, setShowQRCode] = useState(false);
    const [imgSource, setImgSource] = useState("");
    const toggleQRCode = () => {
        setShowQRCode(!showQRCode);
    };

    useEffect(() => {
        const url = `http://ec2-18-217-227-54.us-east-2.compute.amazonaws.com/directions?startLocation=${props.startNode}&endLocation=${props.endNode}&algo=${props.algo}`;
        const generateQRCode = () => {
            QRCode.toDataURL(url, (err, url) => {
                if (!err) {
                    setImgSource(url);
                }
            });
        };

        generateQRCode();
    }, [props.startNode, props.endNode, props.algo]);

    return (
        <Box sx={{
            width: '50%',
        }}>
            <Button
                onClick={toggleQRCode}
                sx={{
                    backgroundColor: '#012d5a',
                    color: 'white',
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    alignSelf: 'center',
                    "&:hover": {
                        background: "#1a426a",
                    },
                }}
            >
                QR Code
            </Button>
            {showQRCode && (
                <Box
                    component="img"
                    className={"logo"}
                    src={imgSource}
                    alt={"QR Code"}
                    sx={{
                        height: "50vh",
                        width: "50vh",
                        mx: 1,
                        p: "1%",
                        position: 'absolute',
                        top: '30%',
                        left: '40%',
                    }}
                ></Box>
            )}
        </Box>
    );
};
