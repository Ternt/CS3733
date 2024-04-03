import React from "react";
import {createBrowserRouter, RouterProvider, Outlet, Link} from "react-router-dom";
import ServiceRequest from "./serviceRequest.tsx";
import { ThemeProvider } from "@mui/material/styles"; // Import ThemeProvider
import CustomTheme from "./components/CustomTheme.tsx"; // Import your custom theme
import MapPage from "./routes/mapPage.tsx";
import LoginPage from "./pages/LoginPage/LoginPage.tsx";
import ServiceRequests from "./showAllSR.tsx";

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
      <div className="w-full flex flex-col px-20 gap-5">
        <div>
            <Link to="/login">Login&emsp;</Link>
            <Link to="">Map&emsp;</Link>
            <Link to="/service-request">Service Request&emsp;</Link>
            <Link to="/service-request-display">Service Request Display</Link>
        </div>
        <Outlet />
      </div>
    );
  }
}

export default App;
