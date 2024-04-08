import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
//import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
//import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import thelowerlevel1 from "../../assets/BWHospitalMaps/00_thelowerlevel1.png";
import thelowerlevel2 from "../../assets/BWHospitalMaps/00_thelowerlevel2.png";
import thefirstfloor from "../../assets/BWHospitalMaps/01_thefirstfloor.png";
import thesecondfloor from "../../assets/BWHospitalMaps/02_thesecondfloor.png";
import thethirdfloor from "../../assets/BWHospitalMaps/03_thethirdfloor.png";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
const images = [
  {
    label: "thelowerlevel1",
    imgPath: thelowerlevel1,
  },
  {
    label: "thelowerlevel2",
    imgPath: thelowerlevel2,
  },
  {
    label: "thefirstfloor",
    imgPath: thefirstfloor,
  },
  {
    label: "thesecondfloor",
    imgPath: thesecondfloor,
  },
  {
    label: "03_thethirdfloor",
    imgPath: thethirdfloor,
  },
];

function SwipeableTextMobileStepper() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep(
      (prevActiveStep) =>
        (prevActiveStep =
          prevActiveStep === images.length - 1
            ? (prevActiveStep = 0)
            : prevActiveStep + 1),
    );
  };

  const handleBack = () => {
    setActiveStep(
      (prevActiveStep) =>
        (prevActiveStep =
          prevActiveStep === 0 ? images.length - 1 : prevActiveStep - 1),
    );
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AutoPlaySwipeableViews
        interval={5000}
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {images.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component="img"
                sx={{
                  height: "70vh",
                  display: "block",
                  objectFit: "cover",
                  overflow: "hidden",
                  width: "100vw",
                  m: "auto",
                }}
                src={step.imgPath}
                alt={step.label}
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            sx={{
              bgcolor: "#012d5a",
              color: "white",
              "&:hover": {
                background: "#33567a",
              },
            }}
          >
            Next
            {theme.direction === "rtl" ? (
              //<KeyboardArrowLeft />
              <p></p>
            ) : (
              //<KeyboardArrowRight />
              <p></p>
            )}
          </Button>
        }
        backButton={
          <Button
            size="small"
            onClick={handleBack}
            sx={{
              bgcolor: "#012d5a",
              color: "white",
              "&:hover": {
                background: "#33567a",
              },
            }}
          >
            {theme.direction === "rtl" ? (
              //<KeyboardArrowRight />
              <p></p>
            ) : (
              //<KeyboardArrowLeft />
              <p></p>
            )}
            Back
          </Button>
        }
      />
    </Box>
  );
}

export default SwipeableTextMobileStepper;
