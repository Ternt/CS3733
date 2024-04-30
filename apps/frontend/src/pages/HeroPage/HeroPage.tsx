import React, {useRef, useState} from "react";
import {Box, Button, Typography} from "@mui/material";
import heroImage from "../../assets/baby.jpg";
//import heroImage2 from "../../assets/baby2.jpg";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import OurServices from "./OurServices.tsx";
import {useNavigate} from "react-router-dom";
import TranslateTo from "../../helpers/multiLanguageSupport.ts";
import FooterBar from "../../components/Footerbar/footer.tsx";
import { motion } from "framer-motion";
import Spline from "@splinetool/react-spline";

export default function HeroPage() {
    const heroPage2Ref = useRef<HTMLDivElement | null>(null);
    const [wong, setWong] = useState(false);

    const handleLearnMoreClick = () => {
        if (heroPage2Ref.current) {
            heroPage2Ref.current.scrollIntoView({behavior: "smooth"});
        }
    };

    const navigate = useNavigate();
    const handleMenuItemClick = (path: string) => {
        navigate(path);
    };

    function hideDisclaimerBox() {
      setBoxDisplay(false);
    }

    const [boxDisplay, setBoxDisplay] = useState(true);

    const itemVariants = {
        hidden: { opacity: 0, y: 75 },
        visible: { opacity: 1, y: 0 }
    };

    return (
      <>
          <Box>
              {boxDisplay &&
                  <motion.div
                    style={{
                      position: "absolute",
                      zIndex: 2,
                      width: '70%',
                      padding: '1rem',
                      backgroundColor: "rgba(238,33,33,0.94)",
                      borderRadius: "10px",
                      filter:'dropShadow(3px 3px 3px #000000a0)',
                      cursor: 'pointer'
                    }}
                    initial={{
                      translate: "15vw -20vh",
                      scale:1,
                    }}
                    animate={{
                      translate: "15vw 1vh",
                      transition:{
                        stiffness: 300,
                        damping: 20,
                        duration: .85,
                        delay: 1,
                      }
                    }}
                    whileHover={{
                      scale:1.05,
                      transition: {
                        duration: .1,
                        delay:0,
                      }
                    }}
                    onClick={hideDisclaimerBox}
                  >
                    <Typography
                        variant="caption"
                        sx={{
                            display: 'inline-block',
                            fontSize: '1rem',
                            lineHeight: '1.4',
                            color: "white",
                        }}
                    >
                        {TranslateTo("Disclaimer")}
                    </Typography>
                </motion.div>
              }
              <Box
                  component="img"
                  draggable={false}
                  className={"logo"}
                  src={
                      wong ? heroImage : heroImage
                  }
                  alt={"logo"}
                  sx={{
                      width: "calc(110vw + 20px)",
                      maxWidth:'unset',
                      height: "calc(90vh + 20px)",
                      objectFit: "cover",
                      overflow: "hidden",
                      filter: "brightness(35%) blur(10px)",
                      bgcolor:'black',
                      padding: 0,
                      mt:'-10px',
                      ml:'-10px',
                      zIndex:-1
                  }}
              >
              </Box>
              <motion.div
                  variants={itemVariants}
                  style={{
                    left: "2vw",
                    position: 'absolute',
                    display:'flex',
                    flexDirection:'column',
                    gap:'2rem',
                  }}
                  initial={{
                      top: "50vh",
                      opacity: 0
                  }}
                  animate={{
                      top: "35vh",
                      opacity: 1
                  }}
                  transition={{
                      stiffness: 300,
                      damping: 20,
                      duration: .85,
                      delay: 0.5
                  }}
              >
                  <Typography variant={"h1"} sx={{color:'white', fontWeight:800}}>
                      {TranslateTo("heroP.findway")}
                  </Typography>
                  <Typography variant={"subtitle1"} sx={{color:'white', maxWidth:'40rem'}}>
                    {TranslateTo("heroP.findwaysub")}
                  </Typography>
                  <Box
                      sx={{
                          display: 'flex',
                          flexDirection: {xs: 'column', sm: 'row'},
                          flexWrap: 'wrap',
                          gap: '3rem',
                      }}
                  >
                      <Button
                          key="Map"
                          onClick={() => {
                              handleMenuItemClick("/map");
                          }}
                          sx={{
                              minWidth: "12rem",
                              py:'.5rem',
                              color: "black",
                              transition: "all 0.2s ease-in-out",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              background: "#f6bd38",
                              "&:hover": {background: "#f8cd69", color: "black"},
                          }}
                      >
                          <Typography variant="h6">
                              {TranslateTo("heroP.map")}
                          </Typography>
                      </Button>
                      <Button
                          key="learnMore"
                          onClick={handleLearnMoreClick}
                          sx={{
                              minWidth: "12rem",
                              py:'.5rem',
                              color: "white",
                              transition: "all 0.2s ease-in-out",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              background: "#012d5a",
                              "&:hover": {background: "#1a426a", color: "white"},
                          }}
                      >
                          <Typography variant="h6">
                              {TranslateTo("heroP.learnMore")}
                          </Typography>
                          <KeyboardDoubleArrowDownIcon/>
                      </Button>
                  </Box>
              </motion.div>
              <Box ref={heroPage2Ref}>
                  <OurServices/>
              </Box>
              <Box
                  sx={{
                      position: 'absolute',
                      width: '800px',
                      height: '600px',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-10%,-50%)'
                  }}
                  onMouseOver={() => {
                      setWong(true);
                  }}
                  onMouseLeave={() => {
                      setWong(false);
                  }}
              >
                <Spline scene="https://prod.spline.design/sgx6gx-v0Lk7HbTm/scene.splinecode" />
              </Box>
            </Box>
          <FooterBar/>
      </>
);
}
