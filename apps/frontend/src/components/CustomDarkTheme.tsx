import { createTheme } from "@mui/material/styles";

const customDarkTheme = createTheme({
    palette: {
        mode: 'dark', // Set mode to dark
        primary: {
            main: "#f6bd38",
        },
        secondary: {
            main: "#012d5a",
        },
        error: {
            main: "#cc0000",
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
                        backgroundColor: "#012d5a",
                        color: "#FFFFFF",
                        "&:hover": {
                            outline: "3px solid #012d5a",
                            backgroundColor: "#FFFFFF",
                            color: "#012d5a",
                        },
                    },
                },
            ],
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#f6bd38",
                        borderWidth: "2px",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#f6bd38",
                        borderWidth: "1px",
                    },
                },
                notchedOutline: {
                    borderColor: "#f6bd38",
                },
            },
        },
        MuiSelect: {
            styleOverrides: {
                select: {
                    "&:focus": {
                        backgroundColor: "transparent",
                    },
                },
                icon: {
                    color: "#f6bd38",
                },
            },
        },
        MuiInputBase: {
            styleOverrides: {
                input: {
                    color: "#FFFFFF", // Change text color to white
                    fontFamily: "Open Sans",
                },
            },
        },
        MuiCheckbox: {
            styleOverrides: {
                root: {
                    color: "#FFFFFF", // Change checkbox color to white
                },
                colorPrimary: {
                    "&.Mui-checked": {
                        color: "#f6bd38",
                    },
                },
                colorSecondary: {
                    "&.Mui-checked": {
                        color: "#012d5a",
                    },
                },
            },
        },
    },
});

export default customDarkTheme;
