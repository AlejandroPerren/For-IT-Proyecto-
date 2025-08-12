import { createHashRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import CoursePage from "./pages/Course";
import Auth from "./pages/Auth";
import Users from "./pages/Users";
import MyCoursesPage from "./pages/MyCourses";
import CreatorCourses from "./pages/CreatorCourses";
import Studying from "./pages/Studying";
import MyAccount from "./pages/MyAccount";
import Help from "./pages/Help";

export const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "/course", element: <CoursePage /> },
      { path: "/auth", element: <Auth /> },
      { path: "/usuarios", element: <Users /> },
      { path: "/misCurso", element: <MyCoursesPage /> },
      { path: "/crearCurso", element: <CreatorCourses /> },
      { path: "/cursando", element: <Studying /> },
      {path: "/cuenta", element: <MyAccount/>},
      {path: "/ayuda", element: <Help/>}
    ],
  },
]);
