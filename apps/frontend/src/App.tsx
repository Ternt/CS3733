import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import ServiceRequest from "./serviceRequest.tsx";
import { ThemeProvider } from "@mui/material/styles"; // Import ThemeProvider
import CustomTheme from "./components/CustomTheme.tsx"; // Import your custom theme
import MapPage from "./routes/mapPage.tsx";
import LoginPage from "./pages/LoginPage/LoginPage.tsx";
import ServiceRequests from "./showAllSR.tsx";
import MapDataDisplay from "./pages/TableDisplayPage/displayCSV.tsx";
//import TouchToStart from "./components/TouchToStart/TouchToStart.tsx";
import NavBar from "./components/navbar/navbar.tsx";
import GiftRequestPage from "./pages/GiftRequestPage/GiftRequestPage.tsx";
import GiftCheckoutPage from "./pages/GiftCheckoutPage/GiftCheckoutPage.tsx";
import FlowerRequestPage from "./pages/FlowerRequestPage/FlowerRequestPage.tsx";
import FlowerCheckoutPage from "./pages/FlowerCheckoutPage/FlowerCheckoutPage.tsx";
import SanitationRequestForm from "./pages/SanitationRequest/SanitaitonRequestForm.tsx";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard.tsx";

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
        {/*<TouchToStart/>*/}
        <div className="w-full flex flex-col">
          <NavBar />
          <Outlet />
        </div>
      </>
    );
  }
}

export default App;
