import React from "react";
import {createBrowserRouter, RouterProvider, Outlet} from "react-router-dom";
import ServiceRequest from "./serviceRequest.tsx";
import EdgeCSVDisplay from "./pages/TableDisplayPage/displayCSV.tsx";
import {ThemeProvider} from "@mui/material/styles"; // Import ThemeProvider
import CustomTheme from "./components/CustomTheme.tsx"; // Import your custom theme
import MapPage from "./routes/mapPage.tsx";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            errorElement: <div/>,
            element: <Root/>,
            children: [
                {
                    path: "",
                    element: <ServiceRequest/>,
                },
                {
                    path: "/map",
                    element: <MapPage/>,
                },
                {
                    path: "/table",
                    element: <EdgeCSVDisplay/>,
                },
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
        return (
            <div className="w-full flex flex-col px-20 gap-5">
                <Outlet/>
            </div>
        );
    }
}

export default App;
