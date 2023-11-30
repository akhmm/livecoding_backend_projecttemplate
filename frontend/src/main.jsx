import React from "react";
import ReactDOM from "react-dom/client";

import App, {pokemonAction, pokemonLoader} from "./App";
import {createBrowserRouter, RouterProvider} from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        loader: pokemonLoader,
        action: pokemonAction
    }
])

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
