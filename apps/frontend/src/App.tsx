import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import ServiceRequest from "./serviceRequest.tsx";
import { ThemeProvider } from "@mui/material/styles"; // Import ThemeProvider
import CustomTheme from "./components/CustomTheme.tsx"; // Import your custom theme
import MapPage from "./routes/mapPage.tsx";
import LoginPage from "./pages/LoginPage/LoginPage.tsx";
import ServiceRequests from "./showAllSR.tsx";
import MapDataDisplay from "./pages/TableDisplayPage/displayCSV.tsx";
import NavBar from "./components/navbar/navbar.tsx";
import HeroPage from "./pages/HeroPage/HeroPage.tsx";
import GiftRequestPage from "./pages/GiftRequestPage/GiftRequestPage.tsx";
import GiftCheckoutPage from "./pages/GiftCheckoutPage/GiftCheckoutPage.tsx";
import FlowerRequestPage from "./pages/FlowerRequestPage/FlowerRequestPage.tsx";
import FlowerCheckoutPage from "./pages/FlowerCheckoutPage/FlowerCheckoutPage.tsx";
import SanitationRequestForm from "./pages/SanitationRequest/SanitaitonRequestForm.tsx";
import MedicineDeliveryForm from "./pages/MedicineRequest/MedicineDeliveryRequest.tsx";

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
          path: "/service-request",
          element: <ServiceRequest />,
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
    return (
      <>
        <div className="w-full flex flex-col">
          <NavBar />
          <Outlet />
        </div>
      </>
    );
  }
}

export default App;
