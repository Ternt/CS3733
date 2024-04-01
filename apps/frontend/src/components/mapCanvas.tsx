import { useRef, useEffect } from 'react';
//import ll1 from "../assets/BWHospitalMaps/00_thelowerlevel1.png";

type mapCanvasProps = {
    image
}

export function MapCanvas(props: mapCanvasProps) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const image = new Image();
        image.src = props.image;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        image.onload = () => {
            context.drawImage(image, 0, 0, 200, 100);
        };
    } );


    return (
        <>
        <canvas ref={canvasRef} width={200} height={100} />
        </>
    );
}

export default MapCanvas;
