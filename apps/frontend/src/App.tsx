import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
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

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <div />,
      element: <Root />,
      children: [
        {
          path: "/service-request",
          element: <ServiceRequest title="Service Request" />,
        },
        {
          path: "/sanitation",
          element: <SanitationRequestForm title="Sanitation Request" />,
        },
        {
          path: "",
          element: <MapPage title="Map" />,
        },
        {
          path: "/login",
          element: <LoginPage title="Login" />,
        },
        {
          path: "/service-request-display",
          element: <ServiceRequests />,
        },
        {
          path: "/gift-request",
          element: <GiftRequestPage title="Gift Request" />,
        },
        {
          path: "/gift-checkout",
          element: <GiftCheckoutPage title="Gift Checkout" />,
        },
        {
          path: "/flower-request",
          element: <FlowerRequestPage title="Flower Request" />,
        },
        {
          path: "/flower-checkout",
          element: <FlowerCheckoutPage title="Flower Checkout" />,
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
        <TouchToStart />
        <div className="w-full flex flex-col">
          <NavBar />
          <Outlet />
        </div>
      </>
    );
  }
}

export default App;
