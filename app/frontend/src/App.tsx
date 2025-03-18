import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/NavBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import RegisterUser from "./pages/RegisterUser";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home/:id/:name" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login/:id" element={<Login />} />
          <Route path="/registerUser" element={<RegisterUser />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
