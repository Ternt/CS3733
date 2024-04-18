import React, { useState } from 'react';
import { Button } from '@mui/material';
import Box from "@mui/material/Box";
import QRCode from "qrcode";

type QRCodePopUpProp = {
    startNode: string;
    endNode: string;
};

export default function QRCodePopUp(props: QRCodePopUpProp) {
    const [showQRCode, setShowQRCode] = useState(false);

    const toggleQRCode = () => {
        setShowQRCode(!showQRCode);
    };

    const [imgSource, setImgSource] = useState("");

    QRCode.toDataURL('/directions?startLocation=' + props.startNode + "&endLocation=" + props.endNode, function (err, url) {
        if (err) {
            return err;
        }
        setImgSource(url);
    });

    return (
        <Box>
            <Button
                onClick={toggleQRCode}
                sx={{
                    backgroundColor: '#012d5a',
                    color: 'white',
                    height: '100%',
                    width: '50%',
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
                        height: "10vh",
                        width: "10vh",
                        mx: 1,
                        p: "1%",
                    }}
                ></Box>
            )}
        </Box>
    );
};
