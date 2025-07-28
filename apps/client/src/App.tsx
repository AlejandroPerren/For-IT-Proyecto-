import { Outlet } from "react-router-dom"
import Nav from "./compontents/main/Nav"


function App() {


  return (
    <div>
      <Nav></Nav>
      <Outlet/>
    </div>
  )
}

export default App
