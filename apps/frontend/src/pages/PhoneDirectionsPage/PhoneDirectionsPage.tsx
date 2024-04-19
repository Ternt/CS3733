import { useState, useEffect } from "react";
import { useSearchParams } from 'react-router-dom';
import {
    List,
    ListItem,
    ListItemText,
} from "@mui/material";
import NaturalLanguageDirection from "../../components/NaturalLanguageDirection/naturalLanguageDirection.tsx";

const PhoneDirectionsPage: React.FC = () => {
    const [natLangPath, setNatLangPath] = useState<string[]>([]);
    const [searchParams] = useSearchParams();

    const startLocation = searchParams.get('startLocation') || 'ACONF00102';
    const endLocation = searchParams.get('endLocation') || 'ACONF00103';
    const algo = searchParams.get('algo') || '0';
    let numericSearchAlgorithm = parseInt(algo, 10);

    if (isNaN(numericSearchAlgorithm)) {
        console.error('Invalid search algorithm number provided, setting to default.');
        numericSearchAlgorithm = 0; // Default value
    }

    useEffect(() => {
        async function setPath() {
            const res = await NaturalLanguageDirection(startLocation, endLocation, numericSearchAlgorithm);
            if (res !== undefined) {
                setNatLangPath(res);
            } else {
                setNatLangPath(["Select a Path"]); // Default path if fetch fails or returns undefined
            }
        }

        setPath();
    }, [startLocation, endLocation, numericSearchAlgorithm]); // Dependency array to re-run this effect if any of these values change

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

export default PhoneDirectionsPage;
