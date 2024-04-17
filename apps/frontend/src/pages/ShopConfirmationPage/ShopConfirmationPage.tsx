import {
    Container,
    Grid,
    Box,
    Typography,
    Link
} from '@mui/material';

import DoneAllIcon from '@mui/icons-material/DoneAll';

type ShopConfirmationPageProps = {
    returnPath: string
}

function ShopConfirmationPage(props: ShopConfirmationPageProps) {
    return (
        <Container maxWidth="lg">
            <Grid container spacing={2} sx={{ height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
                <Grid item xs={12} sx={{ textAlign: 'center' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <DoneAllIcon sx={{ fontSize: '25vw', marginBottom: 2 }} />
                        <Typography variant="h3" gutterBottom>
                            Need to make more purchases?
                        </Typography>
                        <Typography sx={{fontSize: "2rem"}}>
                            <Link href={props.returnPath}>Continue shopping</Link> or
                            <Link href="/apps/frontend/public"> return home</Link>
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
}

export default ShopConfirmationPage;
