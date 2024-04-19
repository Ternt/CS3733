import Box from "@mui/material/Box";
import CarouselComponent from "../../components/Carousel/AboutCarousel.tsx";
import {Typography} from "@mui/material";
function AboutPage() {
    return(
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
            }}
        >
            <Box
                sx={{
                    justifyContent: 'center',
                    textAlign: 'center'
            }}
            >
                <Typography fontSize={"md"} variant={"h1"}>Meet the Team</Typography>
            </Box>
            <Box
                bgcolor={"#e4e4e4"}
                minWidth={"100vw"}
                minHeight={"50vh"}
                padding-top={"5px"}
                sx={{
                    mt: 2
                }}
            >
                <CarouselComponent items={[
                    { title: 'Brett Gerlach', description: 'Front End Engineer', img: './src/assets/PicturesOfTeam/brett_gerlach.jpg' },
                    { title: 'Warwick Barker', description: 'Scrum Master', img: './src/assets/PicturesOfTeam/warwick_barker.jpg' },
                    { title: 'Alex Siracusa', description: 'Assist Lead', img: './src/assets/PicturesOfTeam/alex_siracusa.jpg' },
                    { title: 'Anton Sibal', description: 'Back End Engineer', img: './src/assets/PicturesOfTeam/anton_sibal.jpg' },
                    { title: 'Matt Hagger', description: 'Lead Software Engineer', img: './src/assets/PicturesOfTeam/matt_hagger.jpg' },
                    { title: 'Mauricio Mergal', description: 'Assist Lead', img: './src/assets/PicturesOfTeam/mauricio_mergal.jpg' },
                    { title: 'Nick Rogerson', description: 'Document Analyst', img: './src/assets/PicturesOfTeam/nick_rogerson.jpg' },
                    { title: 'Rayyan Syed', description: 'Project Manager', img: './src/assets/PicturesOfTeam/rayyan_syed.png' },
                    { title: 'Thinh Pham', description: 'Full-Time Software Engineer', img: './src/assets/PicturesOfTeam/thinh_pham.jpg' },
                    { title: 'Yuhan Wu', description: 'Product Owner', img: './src/assets/PicturesOfTeam/yuhan_wu.png' },
                    { title: 'Zachary Szeto', description: 'Backend Software Engineer', img: './src/assets/PicturesOfTeam/zachary_szeto.jpg' },
                ]} />

            </Box>
            <Box>

            </Box>

        </Box>
    );
}


export default AboutPage;
