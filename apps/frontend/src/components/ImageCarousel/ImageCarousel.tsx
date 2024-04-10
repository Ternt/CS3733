import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
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
    <Box
      sx={{
        flexGrow: 1,
      }}
    >
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
                  height: "86.65vh",
                  display: "block",
                  objectFit: "cover",
                  overflow: "hidden",
                  width: "100vw",
                  m: "auto",
                  filter: "brightness(80%) blur(3px) ",
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
        activeStep={activeStep}
        style={{ backgroundColor: "transparent" }}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: "1rem",
          alignContent: "center",
        }}
        nextButton={<></>}
        backButton={<></>}
      />
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          width: "100vw",
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
          padding: "1rem",
          opacity: "30%",
        }}
      >
        <Button
          size="small"
          onClick={handleBack}
          sx={{
            bgcolor: "black",
            color: "white",
            height: "100px",
            minWidth: "0px",
            width: "30px",
            "&:hover": {
              background: "#343434",
            },
          }}
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
        </Button>

        <Button
          size="small"
          onClick={handleNext}
          sx={{
            bgcolor: "black",
            color: "white",
            height: "100px",
            minWidth: "0px",
            width: "30px",

            "&:hover": {
              background: "#343434",
            },
          }}
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </Button>
      </Box>
    </Box>
  );
}

export default SwipeableTextMobileStepper;
