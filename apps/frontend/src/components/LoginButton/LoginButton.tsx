import {
    Button,
    FormControl,
    Typography,
} from "@mui/material";
import {useAuth0} from "@auth0/auth0-react";
import TranslateTo from "../../helpers/multiLanguageSupport.ts";

export default function LoginButton() {
    const {loginWithRedirect, logout, user, error, isAuthenticated,} = useAuth0();

    const handleSubmit = () => {
        if (!user) {
            loginWithRedirect({
                appState: {
                    returnTo: "/",
                },
            }).then(() => {
                // Handle any logic here after loginWithRedirect completes
            }).catch((error) => {
                // Handle any errors here
                console.error(error);
            });
        }
    };

    const handleLogout = () => {
        logout().then(() => {
            // Handle any logic here after logout completes
        }).catch((error) => {
            // Handle any errors here
            console.error(error);
        });
    };

    return (
        <>
            <FormControl sx={{
                width: '10%',
            }}>
                {!isAuthenticated && (
                    <Button
                        color="primary"
                        variant="contained"
                        type="submit"
                        onClick={() => handleSubmit()}
                        sx={{
                            color: 'black',
                            transition: "all 0.2s ease-in-out",
                            "&:hover": {
                                background: "#f9d070",
                                color: "black"
                            },
                        }}
                    >
                        {TranslateTo("Login")}
                    </Button>
                )}
                {isAuthenticated && (
                    <Button
                        color="primary"
                        variant="contained"
                        type="button"
                        onClick={() => handleLogout()}
                        sx={{
                            color: 'black',
                            "&:hover": {
                                background: "#f8cd69",
                                color: 'black',
                            },
                        }}
                    >
                        {TranslateTo("Logout")}
                    </Button>
                )}
                <Typography
                    variant={"subtitle2"}
                    sx={{color: "red", textAlign: "center"}}
                >
                    {error?.message}
                </Typography>
            </FormControl>
        </>
    );
}
