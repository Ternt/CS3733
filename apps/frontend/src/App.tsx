import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useNavigate,
} from "react-router-dom";
import ServiceRequest from "./serviceRequest.tsx";
import { ThemeProvider } from "@mui/material/styles"; // Import ThemeProvider
import CustomTheme from "./components/CustomTheme.tsx"; // Import your custom theme
import MapPage from "./routes/mapPage.tsx";
import LoginPage from "./pages/LoginPage/LoginPage.tsx";
import ServiceRequests from "./showAllSR.tsx";
import MapDataDisplay from "./pages/TableDisplayPage/displayCSV.tsx";
import TouchToStart from "./components/TouchToStart/TouchToStart.tsx";
import NavBar from "./components/navbar/navbar.tsx";
import GiftRequestPage from "./pages/GiftRequestPage/GiftRequestPage.tsx";
import GiftCheckoutPage from "./pages/GiftCheckoutPage/GiftCheckoutPage.tsx";
import FlowerRequestPage from "./pages/FlowerRequestPage/FlowerRequestPage.tsx";
import FlowerCheckoutPage from "./pages/FlowerCheckoutPage/FlowerCheckoutPage.tsx";
import SanitationRequestForm from "./pages/SanitationRequest/SanitaitonRequestForm.tsx";
import { Auth0Provider } from "@auth0/auth0-react";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <div />,
      element: <Root />,
      children: [
        {
          path: "/service-request",
          element: <ServiceRequest />,
        },
        {
          path: "/sanitation",
          element: <SanitationRequestForm />,
        },
        {
          path: "",
          element: <MapPage />,
        },
        {
          path: "/login",
          element: <LoginPage />,
        },
        {
          path: "/service-request-display",
          element: <ServiceRequests />,
        },
        {
          path: "/gift-request",
          element: <GiftRequestPage />,
        },
        {
          path: "/gift-checkout",
          element: <GiftCheckoutPage />,
        },
        {
          path: "/flower-request",
          element: <FlowerRequestPage />,
        },
        {
          path: "/flower-checkout",
          element: <FlowerCheckoutPage />,
        },
        {
          path: "/tables",
          element: <MapDataDisplay />,
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
        <TouchToStart />
        <Auth0Provider
          useRefreshTokens
          cacheLocation="localstorage"
          domain="dev-0kmc0cto8b1g261n.us.auth0.com"
          clientId="bphcdyBgEk1u7ZP1E2EnaMSXQMOIjH3V"
          onRedirectCallback={(appState) => {
            navigate(appState?.returnTo || window.location.pathname);
          }}
          authorizationParams={{
            redirection_uri: window.location.origin,
            audience: "/api",
            scope: "openid profile email offline_access",
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
