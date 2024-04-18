import { useParams } from 'react-router-dom';
import NaturalLanguageDirection from "../../components/NaturalLanguageDirection/naturalLanguageDirection.tsx";
import {useState, useEffect} from "react";

import {
    List,
    ListItem,
    ListItemText,
} from "@mui/material";

const PhoneDirectionsPage: React.FC = () => {
    const [natLangPath, setNatLangPath] = useState<string[]>([]);
    const { startLocation = 'ACONF00102', endLocation = 'ACONF00103', searchAlgorithm = '0' } = useParams<{ startLocation?: string; endLocation?: string; searchAlgorithm?: string }>();
    let numericSearchAlgorithm = parseInt(searchAlgorithm, 10);

    if (isNaN(numericSearchAlgorithm)) {
        console.error('Invalid search algorithm number provided, setting to default.');
        numericSearchAlgorithm = 0;
    }

    useEffect(() => {
        async function setPath() {
            const res = await NaturalLanguageDirection(startLocation, endLocation, numericSearchAlgorithm);
            if (res !== undefined) {
                setNatLangPath(res);
            } else {
                setNatLangPath(["Select a Path"]);
            }
        }

        setPath();
    }, [startLocation, endLocation, numericSearchAlgorithm]);

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
