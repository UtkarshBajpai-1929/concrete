import { createBrowserRouter } from "react-router-dom";

import RootLayout from "./components/layout/RootLayout";

import Home from "./pages/Home";
import ConcreteMix from "./pages/ConcreteMix";
import StructuralDesign from "./pages/StructuralDesign";
import TrafficAnalysis from "./pages/TrafficAnalysis";
import DataBase from "./pages/DataBase";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "concrete-mix",
        element: <ConcreteMix />,
      },
      {
        path: "structural-design",
        element: <StructuralDesign />,
      },
      {
        path: "traffic-analysis",
        element: <TrafficAnalysis />,
      },
      {
      path:"database",
      element:<DataBase />
      }
    ],
  },

]);

export default router;