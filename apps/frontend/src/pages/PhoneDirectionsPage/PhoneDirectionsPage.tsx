import { useState, useEffect } from "react";
import { useSearchParams } from 'react-router-dom';
import {List, ListItem, ListItemText, Typography} from "@mui/material";
import NaturalLanguageDirection from "../../components/NaturalLanguageDirection/naturalLanguageDirection.tsx";
import Link from "@mui/material/Link";

export default function PhoneDirectionsPage(){
    const [natLangPath, setNatLangPath] = useState<string[]>([]);
    const [searchParams] = useSearchParams();
    const startLocation = searchParams.get('startLocation');
    const endLocation = searchParams.get('endLocation');
    const algo = searchParams.get('algo') || '0';
    let numericSearchAlgorithm = parseInt(algo, 10);

    if (isNaN(numericSearchAlgorithm)) {
        console.error('Invalid search algorithm number provided, setting to default.');
        numericSearchAlgorithm = 0; // default
    }

    useEffect(() => {
        async function setPath() {
            console.log(startLocation, endLocation);
            if(startLocation === null || endLocation === null) return;
            const res = await NaturalLanguageDirection(startLocation, endLocation, numericSearchAlgorithm);
            if (res !== undefined) {
                setNatLangPath(res);
            } else {
                setNatLangPath(["Select a Path"]); // Default path if fetch fails or returns undefined
            }
        }

        setPath();
    }, [startLocation, endLocation, numericSearchAlgorithm]);
    if(startLocation === null || startLocation === '' || endLocation === null || endLocation === ''){
      return (
        <>
          <Typography variant={"h4"}>Oops! That path can't be found...</Typography>
          <Link href={"/map"}>Back to map</Link>
        </>
      );
    }
    return (
        <List dense>
            {natLangPath.map((step, index) => (
                <ListItem key={index}>
                    <ListItemText primary={step} />
                </ListItem>
            ))}
        </List>
    );
};
