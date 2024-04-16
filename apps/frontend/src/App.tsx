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
// import {Auth0Provider} from "@auth0/auth0-react";
// import { useNavigate } from 'react-router-dom';


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
          element: <AnimatedPath svgPath="
M 795.6900000000002 119.07000000000001, L 797.5800000000002 124.74,M 797.5800000000002 124.74, L 790.9650000000001 125.685,M 790.9650000000001 125.685, L 782.4600000000002 128.52,M 782.4600000000002 128.52, L 759.7800000000001 135.135,M 759.7800000000001 135.135, L 741.8250000000002 139.86,M 741.8250000000002 139.86, L 730.4850000000001 141.75,M 730.4850000000001 141.75, L 722.9250000000001 143.64000000000001,M 722.9250000000001 143.64000000000001, L 707.8050000000001 147.42,M 707.8050000000001 147.42, L 690.7950000000001 152.145,M 690.7950000000001 152.145, L 686.07 153.09,M 686.07 153.09, L 675.6750000000001 155.925,M 675.6750000000001 155.925, L 666.2250000000001 158.76,M 666.2250000000001 158.76, L 659.6100000000001 159.705,M 659.6100000000001 159.705, L 652.0500000000001 160.65,M 652.0500000000001 160.65, L 646.3800000000001 160.65,M 646.3800000000001 160.65, L 647.325 164.43,M 647.325 164.43, L 635.0400000000001 162.54,M 635.0400000000001 162.54, L 632.205 163.485,M 632.205 163.485, L 622.9440000000001 166.32,M 622.9440000000001 166.32, L 615.5730000000001 166.131,M 615.5730000000001 166.131, L 608.0130000000001 167.454,M 608.0130000000001 167.454, L 596.2950000000001 168.21,M 596.2950000000001 168.21, L 592.5150000000001 168.21,M 592.5150000000001 168.21, L 556.6050000000001 170.478,M 556.6050000000001 170.478, L 550.368 170.667,M 550.368 170.667, L 512.7570000000001 170.478,M 512.7570000000001 170.478, L 505.0080000000001 170.478,M 505.0080000000001 170.478, L 492.3450000000001 170.478,M 492.3450000000001 170.478, L 460.97100000000006 170.478,M 460.97100000000006 170.478, L 450.76500000000004 170.478,M 450.76500000000004 170.478, L 430.73100000000005 170.478,M 430.73100000000005 170.478, L 422.9820000000001 170.478,M 422.9820000000001 170.478, L 411.4530000000001 170.478,M 411.4530000000001 170.478, L 397.8450000000001 170.1,M 397.8450000000001 170.1, L 394.06500000000005 170.1,M 394.06500000000005 170.1, L 384.61500000000007 170.1,M 384.61500000000007 170.1, L 369.49500000000006 170.1,M 369.49500000000006 170.1, L 354.37500000000006 174.825,M 354.37500000000006 174.825, L 354.37500000000006 193.725,M 354.37500000000006 193.725, L 344.92500000000007 193.725,M 344.92500000000007 193.725, L 335.4750000000001 204.12,M 335.4750000000001 204.12, L 328.86000000000007 220.185,M 328.86000000000007 220.185, L 328.86000000000007 232.47,M 328.86000000000007 232.47, L 328.86000000000007 241.92000000000002,M 328.86000000000007 241.92000000000002, L 328.86000000000007 283.5,M 328.86000000000007 283.5, L 325.08000000000004 329.805,M 325.08000000000004 329.805, L 325.08000000000004 340.389,M 325.08000000000004 340.389, L 326.21400000000006 346.815,M 326.21400000000006 346.815, L 326.21400000000006 364.77,M 326.21400000000006 364.77, L 326.59200000000004 385.938,M 326.59200000000004 385.938, L 318.46500000000003 385.749,M 318.46500000000003 385.749, L 322.62300000000005 376.488,"
          />,
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
        // const navigate = useNavigate();
        return (
            <>

                {/*<Auth0Provider*/}
                {/*    useRefreshTokens*/}
                {/*    cacheLocation="localstorage"*/}
                {/*    domain="dev-0kmc0cto8b1g261n.us.auth0.com"*/}
                {/*    clientId="bphcdyBgEk1u7ZP1E2EnaMSXQMOIjH3V"*/}
                {/*    onRedirectCallback={(appState) => {*/}
                {/*        navigate(appState?.returnTo || window.location.pathname);*/}
                {/*    }}*/}
                {/*    authorizationParams={{*/}
                {/*        redirect_uri: window.location.origin*/}
                {/*    }}*/}
                {/*>*/}
                    <div className="w-full flex flex-col">
                        <NavBar />
                        <Outlet />
                    </div>
                {/*</Auth0Provider>*/}
            </>
        );
    }
}

export default App;
