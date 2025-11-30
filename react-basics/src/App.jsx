import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Products from "./components/Products";
import Staff from "./components/Staff";
import EndpointTester from "./components/EndpointTester";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/staff" element={<Staff />} />//
        <Route path="/endpoints" element={<EndpointTester />} />
        <Route path="/EndpointTester" element={<EndpointTester />} />
      </Routes>
    </Router>
  );
}

export default App;
