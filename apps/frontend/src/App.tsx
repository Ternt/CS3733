import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CustomTheme from "./components/CustomTheme.tsx";
import LoginPage from "./pages/LoginPage/LoginPage.tsx";
import MapDataDisplay from "./pages/TableDisplayPage/displayCSV.tsx";
//import TouchToStart from "./components/TouchToStart/TouchToStart.tsx";
import NavBar from "./components/Navbar/Navbar.tsx";
import HeroPage from "./pages/HeroPage/HeroPage.tsx";
import StoreRequestPage from "./pages/StoreRequestPage/StoreRequestPage.tsx";
import Checkout from "./pages/CheckoutPage/MUI Checkout/Checkout.tsx";
import SanitationRequestForm from "./pages/SanitationRequest/SanitaitonRequestForm.tsx";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard.tsx";
import MedicineDeliveryForm from "./pages/MedicineRequest/MedicineDeliveryRequest.tsx";
import MapPage from "./pages/MapPage.tsx";
import {Auth0Provider} from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';


import AnimatedPath from "./components/Map/AnimatedPath.tsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <div />,
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
          element: <AdminDashboard />,
        },
        {
          path: "/test",
          element: <AnimatedPath svgPath="M415,275Q422,310,417.5,354Q413,398,378,423Q343,448,299,423Q255,398,227.5,389.5Q200,381,151,401.5Q102,422,86,383.5Q70,345,65,309.5Q60,274,78.5,243.5Q97,213,87.5,176.5Q78,140,107.5,122Q137,104,160.5,74Q184,44,222,33Q260,22,293.5,43.5Q327,65,362,81Q397,97,386,142.5Q375,188,391.5,214Q408,240,415,275Z" />,
        },
      ],
    },
  ]);

  return (
    <ThemeProvider theme={CustomTheme}>
      {" "}
      {/* Wrap RouterProvider with ThemeProvider */}
      <RouterProvider router={router} />
    </ThemeProvider>
  );

    function Root() {
        const navigate = useNavigate();
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
                        <NavBar />
                        <Outlet />
                    </div>
                </Auth0Provider>
            </>
        );
    }
}

export default App;
