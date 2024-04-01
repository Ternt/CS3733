import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import ExampleRoute from "./routes/ExampleRoute.tsx";
import MapPage from "./routes/mapPage.tsx";

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
          element: <MapPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;

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
