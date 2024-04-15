import React, {ReactNode, useEffect} from "react";
import {Route, BrowserRouter as Router, useNavigate} from "react-router-dom";
import {ThemeProvider} from "@mui/material/styles";
import CustomTheme from "./components/CustomTheme.tsx";
import LoginPage from "./pages/LoginPage/LoginPage.tsx";
import MapDataDisplay from "./pages/TableDisplayPage/displayCSV.tsx";
import NavBar from "./components/Navbar/Navbar.tsx";
import HeroPage from "./pages/HeroPage/HeroPage.tsx";
import Checkout from "./pages/CheckoutPage/MUI Checkout/Checkout.tsx";
import SanitationRequestForm from "./pages/SanitationRequest/SanitaitonRequestForm.tsx";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard.tsx";
import MedicineDeliveryForm from "./pages/MedicineRequest/MedicineDeliveryRequest.tsx";
import MapPage from "./pages/MapPage.tsx";
import {Auth0Provider, useAuth0} from "@auth0/auth0-react";
import {FC} from "react";
import StoreRequestPage from "./pages/StoreRequestPage/StoreRequestPage.tsx";
import { useRoutes } from 'react-router-dom';

const PrivateRoute: FC<{ path: string; children: ReactNode }> = ({children, path}) => {
    const {isAuthenticated} = useAuth0();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login", {replace: true});
        }
    }, [isAuthenticated, navigate]);

    return isAuthenticated ? <Route path={path} element={children} /> : null;
};

function App() {
    return (
        <ThemeProvider theme={CustomTheme}>
            <Router>
                <Root/>
            </Router>
        </ThemeProvider>
    );
}

function Root() {
    const {isAuthenticated} = useAuth0();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login", {replace: true});
        }
    }, [isAuthenticated, navigate]);

    const routing = [
        {
            path: "/",
            element: <Root />,
            children: [
                {
                    path: "",
                    element: <HeroPage />,
                },
                {
                    path: "/map",
                    element: <MapPage />,
                },
                {
                    path: "/medicine-request",
                    element: <MedicineDeliveryForm />,
                },
                {
                    path: "/sanitation",
                    element: <SanitationRequestForm />,
                },
                {
                    path: "/login",
                    element: <LoginPage />,
                },
                {
                    path: "/gift-request",
                    element: <StoreRequestPage requestType={"gift"}/>,
                },
                {
                    path: "/flower-request",
                    element: <StoreRequestPage requestType={"flower"}/>,
                },
                {
                    path: "/gift-checkout",
                    element: (
                        <Checkout checkoutType="gift" returnPath="/gift-request" />
                    ),
                },
                {
                    path: "/flower-checkout",
                    element: (
                        <Checkout checkoutType="flower" returnPath="/flower-request" />
                    ),
                },
                {
                    path: "/tables",
                    element: <MapDataDisplay />,
                },
                {
                    path: "/admin",
                    element: <PrivateRoute path="/admin"><AdminDashboard /></PrivateRoute>,
                },
            ],
        },
    ];

    const element = useRoutes(routing);

    return (
        <Auth0Provider
            useRefreshTokens
            cacheLocation="localstorage"
            domain="dev-0kmc0cto8b1g261n.us.auth0.com"
            clientId="bphcdyBgEk1u7ZP1E2EnaMSXQMOIjH3V"
            onRedirectCallback={(appState) => {
                navigate(appState?.returnTo || window.location.pathname);
            }}
            authorizationParams={{
                redirect_uri: window.location.origin
            }}
        >
            <div className="w-full flex flex-col">
                <NavBar/>
                {element}
            </div>
        </Auth0Provider>
    );
}

export default App;
