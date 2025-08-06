import { createHashRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import CoursePage from "./pages/Course";
import Auth from "./pages/Auth";


export const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "/course", element: <CoursePage /> },
      { path: "/auth", element: <Auth/>}
    ],
  },
]);
