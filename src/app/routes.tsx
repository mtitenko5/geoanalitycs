import { createBrowserRouter } from "react-router";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import MapView from "./components/MapView";
import PromoView from "./components/PromoView";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "map", Component: MapView },
      { path: "promo", Component: PromoView },
    ],
  },
]);
