import {
    Box,
    Button,
    Card,
    FormControl,
    Typography,
} from "@mui/material";
import background from "./login-page-background.png";
import { useAuth0 } from "@auth0/auth0-react";
import User from "../../../../../packages/common/src/User.tsx";

export default function LoginPage() {
    const { loginWithRedirect, logout, user, error, isAuthenticated, isLoading } = useAuth0();

    function logUserInfo(user: User) {
        console.log(user);
    }

    const handleSubmit = () => {
        if (!user) {
            loginWithRedirect({
                appState: {
                    returnTo: location.pathname,
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

    // Log user info
    if (user) {
        logUserInfo(user);
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <img
                src={background}
                alt={"login-background"}
                style={{
                    width: "100vw",
                    height: "50vh",
                    objectFit: "cover",
                }}
            />
            <Box>
                <Card
                    sx={{
                        width: "20vw",
                        position: "absolute",
                        left: "50%",
                        top: "60%",
                        transform: "translate(-50%,-50%)",
                        boxShadow: 5,
                        px: 5,
                        pt: 5,
                        pb: 10,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "flex-start",
                    }}
                >
                    <Typography variant={"h5"}>{isAuthenticated ? 'Logout' : 'Login'}</Typography>
                    <FormControl fullWidth>
                        {!isAuthenticated && (
                            <Button
                                color="secondary"
                                variant="contained"
                                type="submit"
                                onClick={() => handleSubmit()}
                                style={{ marginTop: "40px" }}
                            >
                                Login
                            </Button>
                        )}
                        {isAuthenticated && (
                            <Button
                                color="primary"
                                variant="contained"
                                type="button"
                                onClick={() => handleLogout()}
                                style={{ marginTop: "20px" }}
                            >
                                Logout
                            </Button>
                        )}
                        <Typography
                            variant={"subtitle2"}
                            sx={{ color: "red", textAlign: "center" }}
                        >
                            {error?.message}
                        </Typography>
                    </FormControl>
                </Card>
            </Box>
        </>
    );
}
