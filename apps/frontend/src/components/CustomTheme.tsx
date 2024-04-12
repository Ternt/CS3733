import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  // Overall color palettes of the theme
  palette: {
    primary: {
      main: "#f6bd38", // Main primary color used by default for components.
    },
    secondary: {
      main: "#0044ff", // Main secondary color used by default for components.
    },
    error: {
      main: "#cc0000", // Main error color used for error messages
    },
  },
  components: {
    // Customizations to <button> components
    MuiButton: {
      variants: [
        {
          // Applies to buttons with "contained" variant and "primary" color.
          props: { variant: "contained", color: "primary" },
          style: {
            backgroundColor: "#f6bd38", // Background color for primary contained buttons.
            color: "#FFFFFF", // Text color for primary contained buttons.

            // Styles for hovering over primary contained buttons.
            "&:hover": {
              outline: "3px solid #d4a032", // Adds an outline on hover.
              backgroundColor: "#FFFFFF", // Changes background color on hover.
              color: "#d4a032", // Changes text color on hover.
            },
          },
        },
        {
          // Applies to buttons with "contained" variant and "secondary" color.
          props: { variant: "contained", color: "secondary" },
          style: {
            backgroundColor: "#0044ff", // Background color for secondary contained buttons.
            color: "#FFFFFF", // Text color for secondary contained buttons.

            // Styles for hovering over secondary contained buttons.
            "&:hover": {
              outline: "3px solid #0033cc", // Adds an outline on hover.
              backgroundColor: "#FFFFFF", // Changes background color on hover.
              color: "#0033cc", // Changes text color on hover.
            },
          },
        },
      ],
    },
    // Customizations for the MuiOutlinedInput component.
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          // Styles applied to the root element of the outlined input.
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#f6bd38", // Changes the border color on hover.
            borderWidth: "2px",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#f6bd38", // Changes the border color when the input is focused.
            borderWidth: "1px", // Sets the border width when focused.
          },
        },
        notchedOutline: {
          borderColor: "#f6bd38", // Default border color of the outlined input.
        },
      },
    },
    // Customizations specific to the MuiSelect component.
    MuiSelect: {
      styleOverrides: {
        select: {
          // Styles applied to the select element.
          "&:focus": {
            backgroundColor: "transparent", // Keeps the background transparent on focus.
          },
        },
        icon: {
          // Styles applied to the select dropdown icon.
          color: "#0044ff", // Changes the dropdown icon color.
        },
      },
    },
    // Customization affecting all text fields through MuiInputBase.
    MuiInputBase: {
      styleOverrides: {
        input: {
          // Styles applied to the input element.
          color: "#2f2f2f", // Changes the text color inside the input.
          fontFamily: "Open Sans", // Changes the text font inside all input
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          // Base styles for the checkbox
          color: "#0044ff", // Default color for the checkbox, using secondary color
        },
        colorPrimary: {
          "&.Mui-checked": {
            color: "#f6bd38", // Primary color when checkbox is checked
          },
        },
        colorSecondary: {
          "&.Mui-checked": {
            color: "#0044ff", // Secondary color when checkbox is checked
          },
        },
      },
    },
  },
});

export default theme;
