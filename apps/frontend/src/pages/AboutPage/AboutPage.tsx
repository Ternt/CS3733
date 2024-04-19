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
                <Typography
                    fontSize={"md"}
                    variant={"h1"}
                >
                    Meet the Team
                </Typography>
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
            <Box
                bgcolor={"#012d5a"}
                minWidth={"100vw"}
                minHeight={"50vh"}
                p={10}
                sx={{
                    justifyContent: 'center',
                    textAlign: 'center'
                }}
            >
                <Typography
                    pb={5}
                    color={"white"}
                    variant="h5"
                >
                    WPI Computer Science Department,<br />
                    CS3733-D24 Software Engineering<br />
                </Typography>
                <Box
                    px={40}
                    sx={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%'

                }}>
                    <Typography
                        color={"white"}
                        variant="h5"
                    >
                        Professor
                    </Typography>
                    <Box sx={{
                        flexGrow: 1,
                        borderBottom: '1px dotted white',
                        margin: '0 16px'
                    }} />
                    <Typography
                        color={"white"}
                        variant="h5"
                    >
                        Wilson Wong
                    </Typography>
                </Box>
                <Box
                    p={10}
                    px={40}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%'

                    }}>
                    <Typography
                        color={"white"}
                        variant="h5"
                    >
                        Team Leader
                    </Typography>
                    <Box sx={{
                        flexGrow: 1,
                        borderBottom: '1px dotted white',
                        margin: '0 16px'
                    }} />
                    <Typography color={"white"} variant="h5">Ari</Typography>
                </Box>
                <Typography
                    pb={5}
                    color={"white"}
                    variant="h4"
                >
                    Also a special thank you to Brigham and Women’s Hospital and their representative, Andrew Shinn<br />
                </Typography>
                <Typography
                    pb={5}
                    color={"white"}
                    variant="body2"
                    sx={{
                        textDecoration: "underline"
                    }}
                >
                    The Brigham & Women’s Hospital maps and data used in this application are copyrighted and provided for the sole use of educational purposes.<br />
                </Typography>
            </Box>

        </Box>
    );
}


export default AboutPage;
