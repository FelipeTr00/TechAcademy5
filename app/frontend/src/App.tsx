import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/NavBar";
import PrivateRoute from "./components/utils/PrivateRoute";
import Buy from "./pages/Buy";
import EditUser from "./pages/EditUser";
import Home from "./pages/Home";
import Login from "./pages/Login";
import RegisterUser from "./pages/RegisterUser";
import Sell from "./pages/Sell";
import UserPage from "./pages/UserPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Routes>
          {/* Rotas Públicas */}
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/registerUser" element={<RegisterUser />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/buy" element={<Buy />} />

          {/* Rotas Privadas */}
          <Route
            element={
              <PrivateRoute>
                <Outlet />
              </PrivateRoute>
            }
          >
            <Route path="/home/:userId" element={<Home />} />
            <Route path="/editUser/:userId" element={<EditUser />} />
            <Route path="/user/:userId" element={<UserPage />} />
          </Route>
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
