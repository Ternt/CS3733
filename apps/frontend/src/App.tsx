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
import {Box} from "@mui/material";

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

  return (
    <ThemeProvider theme={CustomTheme}>
      {" "}
      {/* Wrap RouterProvider with ThemeProvider */}
      <RouterProvider router={router} />
    </ThemeProvider>
  );

  function Root() {
    return (
      <>
        <ThemeProvider theme={CustomTheme}>
          <div className="w-full flex flex-col">
            <NavBar />
            <Box
              key={"Navbar spacer"} sx={{width:'100vh', height:'10vh', backgroundColor: "#012d5a",}}></Box>
            <Outlet />
          </div>
        </ThemeProvider>
      </>
    );
  }
}

export default App;
