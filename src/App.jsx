import { Outlet } from "react-router"
import Navbar from "./components/Navbar/Navbar"
import Footer from "./Home/Footer"
import { ToastContainer } from "react-toastify"
const App = () => {
  return(
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>

      <footer>
              <Footer></Footer>
      </footer>
      <ToastContainer />
    </div>
  )
}
export default App