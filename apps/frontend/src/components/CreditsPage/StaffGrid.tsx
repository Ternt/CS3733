import React from 'react';
import {Grid, Container, Typography} from '@mui/material';
import StaffInfoCard from '../Card/StaffInfoCard';

import warwick from '../../assets/TeamPictures/Warwick.jpg';
import brett from '../../assets/TeamPictures/Brett.jpg';
import matt from '../../assets/TeamPictures/Matt.jpg';
import mauri from '../../assets/TeamPictures/Mauri.jpg';
import thinh from '../../assets/TeamPictures/Thinh.jpg';
import nick from '../../assets/TeamPictures/Nick.jpg';
import anton from '../../assets/TeamPictures/Anton.jpg';
import alex from '../../assets/TeamPictures/Alex.jpg';
import rayyan from '../../assets/TeamPictures/Rayyan.png';
import zach from '../../assets/TeamPictures/Zach.jpg';
import yuhan from '../../assets/TeamPictures/Yuhan.png';

// Sample data for staff members
const staffMembers = [
    { name: 'Warwick Barker', role: 'Scrum Master', imageUrl: warwick},
    { name: 'Brett Gerlach', role: 'Full-Time Software Engineer', imageUrl: brett },
    { name: 'Matt Hagger', role: 'Lead Software Engineer', imageUrl: matt },
    { name: 'Mauricio Mergal', role: 'Assistant Lead', imageUrl: mauri },
    { name: 'Thinh Pham', role: 'Full-Time Software Engineer', imageUrl: thinh },
    { name: 'Nick Rogerson', role: 'Documentation Analyst', imageUrl: nick },
    { name: 'Anton Sibal', role: 'Full-Time Software Engineer', imageUrl: anton },
    { name: 'Alex Siracusa', role: 'Assistant Lead', imageUrl: alex },
    { name: 'Rayyan Syed', role: 'Project Manager', imageUrl: rayyan },
    { name: 'Zachary Szeto', role: 'Assistant Lead', imageUrl: zach },
    { name: 'Yuhan Wu', role: 'Product Owner', imageUrl: yuhan },
];


const StaffInfoGrid = () => {
    return (
        <Container style={{ marginTop: '5rem' }}>

            <Typography variant={"h1"} fontFamily={"sans-serif"} align={"center"} sx={{fontWeight: 1000}}>
                Desire Dwarves
            </Typography>

            <Grid container justifyContent="center" spacing={3}>
                {staffMembers.map((member, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                        <StaffInfoCard {...member} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default StaffInfoGrid;
