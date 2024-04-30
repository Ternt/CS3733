import * as React from 'react';
import { Box, Container, Typography, Link, Grid } from '@mui/material';
import brighamLogo from "../../assets/logo.png";
import HarvardLogo from "../../assets/HarvardMedicalSchoolLogo.png";
import TranslateTo from "../../helpers/multiLanguageSupport.ts";

export default function Footer() {

    return (
        <Box
            component="footer"
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                bottom: 0,
                width: '100%',
                py: 3,
                px: 2,
                mt: 'auto',
                backgroundColor: "#012d5a",
                color: 'white',
            }}
        >
            <Container maxWidth="lg">
                <Grid container justifyContent="center" alignItems="center" spacing={2}>
                    <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
                        <Typography variant="body1" component="p" sx={{ fontWeight: 'bold'}}>
                            BRIGHAM AND WOMEN'S HOSPITAL
                        </Typography>
                        <Box
                            sx={{
                                width: '80%',
                                bgcolor: 'white',
                                height: '2px',
                                margin: '8px auto 20px',
                            }}
                        />
                        <Typography variant="subtitle1">
                            75 Francis Street, Boston MA 02115
                        </Typography>
                        <Typography variant="subtitle1">
                            {TranslateTo("generalInfo")} 617-732-5500
                        </Typography>
                        <Typography variant="subtitle1">
                            New Patients: 800-294-9999
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Link href="https://www.brighamandwomens.org" target="_blank" rel="noopener noreferrer">
                            <img src={brighamLogo} alt="Brigham and Women's Hospital Logo" style={{ height: '100px'}}/>
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link href="https://hms.harvard.edu" target="_blank" rel="noopener noreferrer">
                            <img src={HarvardLogo} alt="Harvard Logo" style={{height: '100px'}}/>
                        </Link>
                    </Grid>
                </Grid>
                <Typography variant="body2" align="center" sx={{ mt:2 }}>
                    © 2024 Brigham and Women's Hospital | CS3733 - Desire Dwarves (Team D)
                </Typography>
            </Container>
        </Box>
);
}
