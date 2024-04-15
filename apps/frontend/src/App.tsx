import React, {useEffect} from "react";
import {createBrowserRouter, RouterProvider, Outlet, Route} from "react-router-dom";
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
import {Auth0Provider, useAuth0} from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';
import {ReactNode, FC} from "react";


interface PrivateRouteProps {
    path: string;
    children: ReactNode;
}

const PrivateRoute: FC<PrivateRouteProps> = ({ children, ...rest }) => {
    const { isAuthenticated } = useAuth0();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login", { replace: true });
        }
    }, [isAuthenticated, navigate]);

    return (
        <Route {...rest}>
            {children}
        </Route>
    );
};

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
      ],
    },
  ]);
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
                    element: <GiftRequestPage />,
                },
                {
                    path: "/flower-request",
                    element: <GiftRequestPage />,
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
            ].map(route => {
                // If the path is /map or /login, return the route as is
                if (route.path === "/map" || route.path === "/login") {
                    return route;
                }

                // Otherwise, return the route as a PrivateRoute
                return {
                    ...route,
                    element: <PrivateRoute path={route.path}>{route.element}</PrivateRoute>,
                };
            }),
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
