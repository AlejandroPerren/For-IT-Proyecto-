import { Outlet } from "react-router-dom"
import Nav from "./compontents/main/Nav"
import NavCourse from "./compontents/courses/NavCurse"


function App() {


  return (
    <div>
      <Nav></Nav>
      <NavCourse/>
      <Outlet/>
    </div>
  )
}

export default App
