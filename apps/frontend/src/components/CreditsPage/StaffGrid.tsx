import React from 'react';
import { Grid, Container } from '@mui/material';
import StaffInfoCard from '../Card/StaffInfoCard'; // Adjust the path accordingly

// Sample data for staff members
const staffMembers = [
    { name: 'Warwick Barker', role: 'Scrum Master', imageUrl: 'url_of_image_1.jpg' },
    { name: 'Brett Gerlach', role: 'Full-Time Software Engineer', imageUrl: 'url_of_image_2.jpg' },
    { name: 'Matt Hagger', role: 'Lead Software Engineer', imageUrl: 'url_of_image_3.jpg' },
    { name: 'Mauricio Mergal', role: 'Assistant Lead', imageUrl: 'url_of_image_4.jpg' },
    { name: 'Thinh Pham', role: 'Full-Time Software Engineer', imageUrl: 'url_of_image_5.jpg' },
    { name: 'Nick Rogerson', role: 'Documentation Analyst', imageUrl: 'url_of_image_6.jpg' },
    { name: 'Anton Sibal', role: 'Full-Time Software Engineer', imageUrl: 'url_of_image_7.jpg' },
    { name: 'Alex Siracusa', role: 'Assistant Lead', imageUrl: 'url_of_image_8.jpg' },
    { name: 'Rayyan Syed', role: 'Project Manager', imageUrl: 'url_of_image_9.jpg' },
    { name: 'Zachary Szeto', role: 'Full-Time Software Engineer', imageUrl: 'url_of_image_10.jpg' },
    { name: 'Yuhan Wu', role: 'Product Owner', imageUrl: 'url_of_image_11.jpg' },
];


const StaffInfoGrid = () => {
    return (
        <Container style={{ marginTop: '50px' }}>
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
