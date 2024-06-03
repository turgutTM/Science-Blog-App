import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  HomeLayout,
  Error,
  FirstPage,
  SignIn,
  SignUp,
  Recommended,
  DashboardLayout,
  AllScientists,
  Admin,
  Scientist,
} from "./pages";
import { Toaster } from "react-hot-toast";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />, // İlk açılan sayfa HomeLayout içinde olacak
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <FirstPage />,
      },
      {
        path: "login",
        element: <SignIn />,
      },
      {
        path: "register",
        element: <SignUp />,
      },
      {
        path: "dashboard",
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <Recommended />,
          },
          {
            path: "allscientists",
            element: <AllScientists></AllScientists>,
          },
          {
            path: "admin",
            element: <Admin></Admin>,
          },
          {
            path: "admin/:id",
            element: <Admin></Admin>,
          },
          {
            path: "scientist/:id",
            element: <Scientist></Scientist>,
          },
        ],
      },
    ],
  },
]);


function App() {
  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
