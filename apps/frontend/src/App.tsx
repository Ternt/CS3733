import React, {useState, createContext} from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CustomTheme from "./components/CustomTheme.tsx";
import LoginButton from "./components/LoginButton/LoginButton.tsx";
import MapDataDisplay from "./components/DataHandling/DisplayCSV.tsx";
import NavBar from "./components/Navbar/Navbar.tsx";
import HeroPage from "./pages/HeroPage/HeroPage.tsx";
import StoreRequestPage from "./pages/StoreRequestPage/StoreRequestPage.tsx";
import Checkout from "./pages/CheckoutPage/MUI Checkout/Checkout.tsx";
import SanitationRequestForm from "./pages/SanitationRequest/SanitaitonRequestForm.tsx";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard.tsx";
import MedicineDeliveryForm from "./pages/MedicineRequest/MedicineDeliveryRequest.tsx";
import MapPage from "./pages/MapPage.tsx";
import {Auth0Provider} from "@auth0/auth0-react";
import {useNavigate} from 'react-router-dom';
import Box from "@mui/material/Box";
import Chatbot from "./components/ChatBot/ChatBot.tsx";
import ShopConfirmationPage from "./pages/ShopConfirmationPage/ShopConfirmationPage.tsx";
import AboutPage from "./pages/AboutPage/AboutPage.tsx";
import PhoneDirectionsPage from "./pages/PhoneDirectionsPage/PhoneDirectionsPage.tsx";
import LanguageInterpreterRequestForm from "./pages/LanguageInterpreterRequest/LanguageInterpreterRequest.tsx";
import SearchPage from "./pages/SearchPage/SearchPage.tsx";
import ErrorPage from "./pages/404Page/ErrorPage.tsx";
import HowToPage from "./pages/howToPage/howToPage.tsx";
import CreditsPage from "./pages/CreditsPage/CreditsPage.tsx";
import ReligiousRequestForm from "./pages/ReligiousRequestPage/ReligiousRequestPage.tsx";
import CheckInForm from "./pages/PatientCheckInRequest/PatientCheckIn2.tsx";


export const LanguageContext = createContext("en");

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            errorElement: <div/>,
            element: <Root/>,
            children: [
                {
                    path: "*",
                    element: <ErrorPage />
                },
                {
                    path: "",
                    element: <HeroPage/>,
                },
                {
                    path: "/map",
                    element: <MapPage/>,
                },
                {
                    path: "/medicine-request",
                    element: <MedicineDeliveryForm/>,
                },
                {
                    path: "/religious-request",
                    element: <ReligiousRequestForm/>,
                },
                {
                    path: "/checkin-request",
                    element: <CheckInForm/>,
                },
                {
                    path: "/sanitation",
                    element: <SanitationRequestForm/>,
                },
                {
                    path: "/login",
                    element: <LoginButton/>,
                },
                {
                    path: "/gift-request",
                    element: <StoreRequestPage/>,
                },
                {
                    path: "/flower-request",
                    element: <StoreRequestPage/>,
                },
                {
                    path: "/gift-checkout",
                    element: (
                        <Checkout checkoutType="gift" returnPath="/gift-request"/>
                    ),
                },
                {
                    path: "/flower-checkout",
                    element: (
                        <Checkout checkoutType="flower" returnPath="/flower-request"/>
                    ),
                },
                {
                    path: "/tables",
                    element: <MapDataDisplay/>,
                },
                {
                    path: "/admin",
                    element: <AdminDashboard/>,
                },
                {
                    path: "/gift-order-confirmation",
                    element: <ShopConfirmationPage returnPath="/gift-request"/>
                },
                {
                    path: "/flower-order-confirmation",
                    element: <ShopConfirmationPage returnPath="/flower-request"/>
                },
                {
                    path: "/directions",
                    element: <PhoneDirectionsPage/>
                },
                {
                    path: "/language-request",
                    element: <LanguageInterpreterRequestForm/>,
                },
                {
                    path: "/search",
                    element: <SearchPage/>
                },
                {
                    path: "/howTo",
                    element: <HowToPage/>
                },
                {
                    path: "/about",
                    element: <AboutPage />
                },
                {
                    path: "/credits",
                    element: <CreditsPage/>
                },
                {
                    path: "/interpreter",
                    element: <LanguageInterpreterRequestForm/>
                }
            ],
        },
    ]);


    return (
        <ThemeProvider theme={CustomTheme}>
            {" "}
            {/* Wrap RouterProvider with ThemeProvider */}
            <RouterProvider router={router}/>
        </ThemeProvider>
    );

    function Root() {
        const navigate = useNavigate();
        const [chatbotOpen, setChatbotOpen] = useState(false);
        const [lang, setlang] = useState<string>("en");

        return (
            <>
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
                        <LanguageContext.Provider value={lang}>
                            <NavBar
                              chatbotOpen={chatbotOpen}
                              toggleChatbot={()=>setChatbotOpen(!chatbotOpen)}
                              onSetLanguage={(l)=> {setlang(l);}}
                            />
                            <Box key={"Navbar spacer"} sx={{width:'100%', height:'10vh', backgroundColor: "#012d5a",}}></Box>
                            <Outlet />
                            <Chatbot
                              open={chatbotOpen}
                              onClose={()=>setChatbotOpen(false)}
                            />
                        </LanguageContext.Provider>
                    </div>
                </Auth0Provider>
            </>
        );
    }
}


export default App;
