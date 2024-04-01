import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import ExampleRoute from "./routes/ExampleRoute.tsx";
import {MapCanvas} from "./components/mapCanvas.tsx";
import ll1 from "./assets/BWHospitalMaps/00_thelowerlevel1.png";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <div />,
      element: <Root />,
      children: [
        {
          path: "",
          element: <ExampleRoute />,
        },
          {
              path: "/map",
              element: <MapCanvas image={ll1}/>,
          },
      ],
    },
  ]);

    return <RouterProvider router={router}/>;

    function Root() {
        return (
            <div className="w-full flex flex-col px-20 gap-5">
        <h1>Welcome to your starter code.</h1>
        <Outlet />
      </div>
    );
  }
}

export default App;
