import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#f6bd38",
    },
    secondary: {
      main: "#0044ff",
    },
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: "contained", color: "primary" },
          style: {
            backgroundColor: "#f6bd38",
            color: "#FFFFFF",
            "&:hover": {
              outline: "3px solid #d4a032",
              backgroundColor: "#FFFFFF",
              color: "#d4a032",
            },
          },
        },
        {
          props: { variant: "contained", color: "secondary" },
          style: {
            backgroundColor: "#0044ff",
            color: "#FFFFFF",
            "&:hover": {
              outline: "3px solid #0033cc",
              backgroundColor: "#FFFFFF",
              color: "#0033cc",
            },
          },
        },
      ],
    },
  },
});

export default theme;
