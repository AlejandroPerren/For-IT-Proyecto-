import { Outlet } from "react-router-dom";
import Nav from "./compontents/main/Nav";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <Nav></Nav>
      <main className="pt-[15vh] px-4">
        <Outlet />
      </main>
      <ToastContainer />
    </div>
  );
}

export default App;
